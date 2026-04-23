package com.api.kilow.service;

import com.api.kilow.dto.billing.*;
import com.api.kilow.exception.RulesException;
import com.api.kilow.model.Billing;
import com.api.kilow.model.User;
import com.api.kilow.repository.BillingsRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BillingService {

  @Autowired private BillingsRepository billingsRepository;

  @Autowired private LoggedUserService loggedUserService;

  public CreateBillingResponse createBilling(CreateBillingRequest requestDTO) {
    User loggedUser = loggedUserService.getUser();

    Billing billing = new Billing();

    billing.setUser(loggedUser);
    billing.setApelido(getBillingNickname(requestDTO));
    billing.setAnoReferencia(requestDTO.anoReferencia());
    billing.setMesReferencia(requestDTO.mesReferencia());
    billing.setValorTotal(requestDTO.valorTotal());
    billing.setConsumoTotalKwh(requestDTO.consumoTotalKwh());

    Billing createdBilling = billingsRepository.save(billing);

    Double effectiveTariff =
        getEffectiveTariff(createdBilling.getValorTotal(), createdBilling.getConsumoTotalKwh());

    return new CreateBillingResponse(
        createdBilling.getId(),
        createdBilling.getApelido(),
        createdBilling.getMesReferencia(),
        createdBilling.getAnoReferencia(),
        effectiveTariff);
  }

  public List<GetBillingResponse> getAllBillings() {
    User loggedUser = loggedUserService.getUser();

    return billingsRepository.findByUser(loggedUser).stream()
        .map(
            billing -> {
              Double effectiveTariff =
                  getEffectiveTariff(billing.getValorTotal(), billing.getConsumoTotalKwh());
              return new GetBillingResponse(
                  billing.getId(),
                  billing.getApelido(),
                  billing.getMesReferencia(),
                  billing.getAnoReferencia(),
                  billing.getValorTotal(),
                  billing.getConsumoTotalKwh(),
                  effectiveTariff);
            })
        .toList();
  }

  public void deleteBilling(Long id) {
    Billing billingToDelete =
        billingsRepository
            .findById(id)
            .orElseThrow(
                () -> new RulesException("Conta de luz não encontrado. Verifique o ID digitado."));

    validateUser(billingToDelete);

    billingsRepository.delete(billingToDelete);
  }

  public UpdateBillingResponse updateBilling(Long id, UpdateBillingRequest requestBody) {
    Billing billingToUpdate =
        billingsRepository
            .findById(id)
            .orElseThrow(
                () -> new RulesException("Conta de luz não encontrado. Verifique o ID digitado."));

    validateUser(billingToUpdate);

    billingToUpdate.setApelido(requestBody.apelido());
    billingToUpdate.setConsumoTotalKwh(requestBody.consumoTotalKwh());
    billingToUpdate.setAnoReferencia(requestBody.anoReferencia());
    billingToUpdate.setMesReferencia(requestBody.mesReferencia());
    billingToUpdate.setValorTotal(requestBody.valorTotal());

    Billing updatedBilling = billingsRepository.save(billingToUpdate);

    return new UpdateBillingResponse(
        updatedBilling.getApelido(),
        updatedBilling.getId(),
        updatedBilling.getMesReferencia(),
        updatedBilling.getAnoReferencia());
  }

  private String getBillingNickname(CreateBillingRequest billingRequest) {
    if (billingRequest.apelido() == null || billingRequest.apelido().isBlank()) {
      return String.format(
          "Conta de luz - %d/%d", billingRequest.mesReferencia(), billingRequest.anoReferencia());
    }
    return billingRequest.apelido().trim();
  }

  private Double getEffectiveTariff(Double billingTotalAmount, Double totalKwhConsumption) {
    if (totalKwhConsumption == null || totalKwhConsumption <= 0.0) {
      return 0.0;
    }
    return Math.round((billingTotalAmount / totalKwhConsumption) * 100.0) / 100.0;
  }

  private void validateUser(Billing billing) {
    if (!billing.getUser().getId().equals(loggedUserService.getUserId())) {
      throw new RulesException("Você não tem permissão para alterar esta conta.");
    }
  }
}
