package com.api.kilow.service;

import com.api.kilow.dto.billing.CreateBillingRequest;
import com.api.kilow.dto.gemini.GeminiImageRequest;
import com.api.kilow.dto.gemini.GeminiRequestDTO;
import com.api.kilow.dto.gemini.GeminiResponseDTO;
import com.api.kilow.dto.gemini.WattsResponseDTO;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.multipart.MultipartFile;

@Service
public class AiService {
  @Value("${api.scrape.token}")
  private String scrapeToken;

  @Value("${api.gemini.url}")
  private String geminiUrl;

  @Value("${api.gemini.key}")
  private String geminiKey;

  int ATTEMPTS_MAX_NUMBER = 3;

  private final RestClient restClient = RestClient.create();

  private final ObjectMapper objectMapper = new ObjectMapper();

  public WattsResponseDTO extractWattsFromUrl(String deviceUrl) throws Exception {
    String pageHtml = getStoreHtml(deviceUrl);
    if (!pageHtml.toLowerCase().contains("captcha") && !deviceUrl.toLowerCase().contains("bot")) {
      WattsResponseDTO extracted = askGemini(pageHtml);

      if (extracted != null
          && extracted.consumoWattsEncontrado() != null
          && extracted.consumoWattsEncontrado() > 0) {
        return new WattsResponseDTO(
            extracted.nomeSugerido(), extracted.consumoWattsEncontrado(), null, "SCRAPING");
      }
    }

    String simpleDeviceName = extractDeviceSimpleNameFromUrl(deviceUrl);
    WattsResponseDTO suggestWatts = askSuggestion(simpleDeviceName);

    if (suggestWatts != null
        && suggestWatts.consumoWattsSugeridoIA() != null
        && suggestWatts.consumoWattsSugeridoIA() > 0) {
      return new WattsResponseDTO(
          suggestWatts.nomeSugerido(), null, suggestWatts.consumoWattsSugeridoIA(), "SUGESTAO");
    }
    return new WattsResponseDTO("Aparelho Desconhecido", null, null, "FALHA");
  }

  private String getStoreHtml(String url) {
    try {
      String cleanUrl = url;
      if (url.contains("?")) {
        cleanUrl = url.split("\\?")[0];
      }
      String encodedUrl = URLEncoder.encode(cleanUrl, StandardCharsets.UTF_8.toString());
      String scrapeUrl =
          "http://api.scrape.do?token=" + scrapeToken + "&render=true&url=" + encodedUrl;
      return restClient.get().uri(java.net.URI.create(scrapeUrl)).retrieve().body(String.class);
    } catch (Exception e) {
      throw new RuntimeException("Falha ao montar a URL de Scraping", e);
    }
  }

  private WattsResponseDTO askGemini(String html) throws Exception {
    String prompt =
        "Você é um detetive de dados de e-commerce sênior. Leia o código fonte HTML abaixo e extraia: "
            + "1. O nome do produto. "
            + "2. A potência de consumo de energia do aparelho, estritamente convertida para Watts (W) numéricos. "
            + "Atenção: Procure profundamente em tabelas técnicas, descrições ocultas, dropdowns ou seções de 'Especificações'. "
            + "A potência pode estar escrita como 'Potência: 1500', '1500W', '1.5kW', '1500 watts'. Se for kW, multiplique por 1000. "
            + "Responda EXATAMENTE E APENAS com um objeto JSON válido neste formato: {\"nomeSugerido\": \"Nome do Produto Encontrado\", \"consumoWattsEncontrado\": 400.0}. "
            + "Não use crases (```), formatação Markdown ou textos extras. "
            + "Se não encontrar o nome, retorne \"Desconhecido\". Se não encontrar a potência de jeito nenhum, retorne 0. "
            + "HTML: "
            + html;

    var request = GeminiRequestDTO.createPrompt(prompt);

    return requestGeminiWithRetry(request, WattsResponseDTO.class);
  }

  private WattsResponseDTO askSuggestion(String deviceName) throws Exception {
    String prompt =
        "Você é um engenheiro eletricista especialista no mercado brasileiro. "
            + "Baseado neste link ou nome de produto: '"
            + deviceName
            + "', identifique o aparelho e estime o consumo médio padrão em Watts (W). "
            + "Responda EXATAMENTE com um JSON: {\"nomeSugerido\": \"Nome Padrão...\", \"consumoWattsSugeridoIA\": 1500.0}. "
            + "Não use crases ou formatação Markdown. Se não reconhecer nada, retorne 0.0.";

    var request = GeminiRequestDTO.createPrompt(prompt);

    return requestGeminiWithRetry(request, WattsResponseDTO.class);
  }

  private String extractDeviceSimpleNameFromUrl(String url) {
    try {
      if (url.contains("?")) return url.split("\\?")[0];
      return url;
    } catch (Exception e) {
      return url;
    }
  }

  /* Billing */

  public CreateBillingRequest extractBillingDataFromImage(MultipartFile image) throws Exception {
    String base64Image = Base64.getEncoder().encodeToString(image.getBytes());
    String prompt =
        "Analise esta fatura de luz. Retorne APENAS um JSON com: "
            + "mesReferencia (int), anoReferencia (int), valorTotal (double), consumoTotalKwh (double). "
            + "Não use markdown ou texto adicional.";

    var request = GeminiImageRequest.create(prompt, base64Image, image.getContentType());

    return requestGeminiWithRetry(request, CreateBillingRequest.class);
  }

  /* Utils */

  private <T, R> R requestGeminiWithRetry(T requestPayload, Class<R> responseType)
      throws Exception {

    int currentAttempt = 1;

    while (currentAttempt <= ATTEMPTS_MAX_NUMBER) {
      try {
        GeminiResponseDTO response =
            restClient
                .post()
                .uri(geminiUrl + geminiKey)
                .body(requestPayload)
                .retrieve()
                .body(GeminiResponseDTO.class);

        if (response != null) {
          String jsonIA = response.extractText().trim();

          String cleanJson = jsonIA.replace("```json", "").replace("```", "").trim();

          return objectMapper.readValue(cleanJson, responseType);
        }
      } catch (org.springframework.web.client.HttpServerErrorException.ServiceUnavailable e) {
        System.err.println("Google Gemini sobrecarregado (503). Tentativa " + currentAttempt);
        if (currentAttempt == ATTEMPTS_MAX_NUMBER) return null;
        Thread.sleep(3000);
        currentAttempt++;
      } catch (Exception e) {
        System.err.println("Erro na conversão ou chamada da IA: " + e.getMessage());
        return null;
      }
    }
    return null;
  }
}
