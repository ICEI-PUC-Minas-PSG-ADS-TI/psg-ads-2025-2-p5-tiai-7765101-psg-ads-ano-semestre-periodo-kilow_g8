package com.api.kilow.controller;

import com.api.kilow.dto.billing.CreateBillingRequest;
import com.api.kilow.dto.gemini.WattsRequestDTO;
import com.api.kilow.dto.gemini.WattsResponseDTO;
import com.api.kilow.service.AiService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/ia")
public class AiController {

  @Autowired private AiService aiService;

  @PostMapping("/getWatts")
  public ResponseEntity<WattsResponseDTO> extractDataWithAI(
      @RequestBody @Valid WattsRequestDTO request) throws Exception {

    WattsResponseDTO dataExtracted = aiService.extractWattsFromUrl(request.url());

    return ResponseEntity.ok(dataExtracted);
  }

  @PostMapping(value = "extract", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
  public ResponseEntity<CreateBillingRequest> extractBillingData(
      @RequestParam("file") MultipartFile image) throws Exception {
    return ResponseEntity.ok(aiService.extractBillingDataFromImage(image));
  }
}
