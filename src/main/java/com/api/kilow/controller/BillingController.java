package com.api.kilow.controller;

import com.api.kilow.dto.billing.*;
import com.api.kilow.service.BillingService;
import jakarta.validation.Valid;
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
  public ResponseEntity<BillingListResponse> getAllBillings() {
    BillingListResponse listBillingsResponse = billingService.listBilligs();

    return ResponseEntity.ok(listBillingsResponse);
  }

  @GetMapping("/getDetail/{id}")
  public ResponseEntity<GetBillingDetail> getBillingDetail(@PathVariable Long id) {
    GetBillingDetail billing = billingService.getBillingDetail(id);

    return ResponseEntity.ok(billing);
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
