package com.api.kilow.repository;

import com.api.kilow.model.Billing;
import com.api.kilow.model.User;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BillingsRepository extends JpaRepository<Billing, Long> {
  List<Billing> findByUser(User user);

  List<Billing> findByUserAndAnoReferencia(User user, Integer anoReferencia);

  Optional<Billing> findFirstByUserOrderByValorTotalDesc(User user);
}
