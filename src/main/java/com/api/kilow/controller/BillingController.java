package com.api.kilow.controller;

import com.api.kilow.dto.billing.*;
import com.api.kilow.service.BillingService;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(path = "/billings")
public class BillingController {

  @Autowired private BillingService billingService;

  @PostMapping("/register")
  public ResponseEntity<CreateBillingResponse> createBilling(
      @Valid @RequestBody CreateBillingRequest request) {
    CreateBillingResponse billing = billingService.createBilling(request);

    return ResponseEntity.status(HttpStatus.CREATED).body(billing);
  }

  @GetMapping("/getAll")
  public ResponseEntity<List<GetBillingResponse>> getAllBillings() {
    List<GetBillingResponse> allBillings = billingService.getAllBillings();

    return ResponseEntity.ok(allBillings);
  }

  @PutMapping("/update/{id}")
  public ResponseEntity<UpdateBillingResponse> updateBilling(
      @PathVariable Long id, @Valid @RequestBody UpdateBillingRequest request) {
    UpdateBillingResponse updatedBilling = billingService.updateBilling(id, request);

    return ResponseEntity.ok(updatedBilling);
  }

  @DeleteMapping("/delete/{id}")
  public ResponseEntity<Void> deleteBilling(@PathVariable Long id) {
    billingService.deleteBilling(id);

    return ResponseEntity.noContent().build();
  }
}
