package com.api.kilow.dto.gemini;

import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

public record GeminiImageRequest(List<Content> contents) {
  public record Content(List<Part> parts) {}

  public record Part(String text, @JsonProperty("inline_data") InlineData inlineData) {}

  public record InlineData(@JsonProperty("mime_type") String mimeType, String data) {}

  public static GeminiImageRequest create(String prompt, String base64Image, String mimeType) {
    Part textPart = new Part(prompt, null);
    Part imagePart = new Part(null, new InlineData(mimeType, base64Image));

    return new GeminiImageRequest(List.of(new Content(List.of(textPart, imagePart))));
  }
}
