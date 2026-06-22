'use client';
import { StyledText } from '@/components/text';
import Dropdown from '../dropdown';
import FieldWrapper from '../fieldWrapper';
import { EffectiveTariff, FormLine } from './style';
import StyledInput from '../input';
import SpecificInput from '../specificInput';
import { useBillingForm } from '@/hooks/useBillingForm';
import { months } from '@/app/(private)/billings/create/utils';

const BillingForm = () => {
  const { billingContext: billingForm } = useBillingForm();
  return (
    <>
      <FieldWrapper
        label="Apelido/Nome"
        variant="small"
        description="Informe um nome ou apelido para facilitar a identificação da nova conta de luz"
      >
        <StyledInput
          placeholder="ex.: Conta Janeiro 2025"
          onChange={billingForm.setBillingNickname}
          type="string"
          value={billingForm.billingNickname}
          height={36}
        />
      </FieldWrapper>
      <FormLine>
        <FieldWrapper
          label="Mês referência"
          variant="small"
          isRequired
          description="Informe o mês referência da nova conta

"
        >
          <Dropdown
            selectedValue={billingForm.referenceMonth}
            onSelect={billingForm.setReferenceMonth}
            placeholder="ex.: Março"
            options={months}
          />
        </FieldWrapper>

        <FieldWrapper
          label="Ano referência"
          variant="small"
          description="Informe o ano referência da nova conta"
          isRequired
        >
          <StyledInput
            placeholder="ex.: 2025"
            onChange={billingForm.setReferenceYear}
            type="number"
            value={billingForm.referenceYear}
            height={36}
          />
        </FieldWrapper>
      </FormLine>
      <FieldWrapper
        label="Valor total(R$)"
        isRequired
        variant="small"
        description="Informe total da conta de luz. Valor exato conforme 'Total a pagar' na sua conta"
      >
        <SpecificInput
          type="Specific"
          onChange={billingForm.setBillingAmount}
          placeholder="ex.: R$ 210,43"
          value={billingForm.billingAmount}
        />
      </FieldWrapper>
      <FieldWrapper
        label="Consumo total(kWh)"
        isRequired
        variant="small"
        description="Informe total de quilowatt-hora gastos na conta de luz."
      >
        <SpecificInput
          type="kWh"
          onChange={billingForm.setBillingKwh}
          placeholder="ex.: 104,12 kWh"
          value={billingForm.billingKwh}
        />
      </FieldWrapper>
      <EffectiveTariff>
        <StyledText color="darkGray" size={10} weight={600}>
          TARIFA EFETIVA APROXIMADA
        </StyledText>
        <StyledText color="darkBlue" size={16} weight={700}>
          {billingForm.billingAmount && billingForm.billingKwh
            ? `R$ ${Math.trunc((billingForm.billingAmount / billingForm.billingKwh) * 100) / 100}/kWh`
            : 'Preenhca os campos '}
        </StyledText>
        <StyledText
          color="darkBlue"
          size={12}
          weight={450}
          style={{ opacity: 0.3 }}
        >
          Tarifa sem arredondamento:{' '}
          {billingForm.billingAmount && billingForm.billingKwh
            ? `R$ ${billingForm.billingAmount / billingForm.billingKwh}/kWh`
            : 'Preecha os campos para que o cálculo da tarifa efetiva possa ser feito'}
        </StyledText>
      </EffectiveTariff>
    </>
  );
};

export default BillingForm;
