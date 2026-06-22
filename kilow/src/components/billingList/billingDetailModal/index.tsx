import { useGetBillingDetail } from '@/hooks/useGetBillingDetail';
import { colors } from '../../theme';
import { StyledText } from '../../text';
import {
  CloseModalIcon,
  InfoBoxContainer,
  ModalHeaderContainer,
} from './style';
import MiniIdeaLoader from '../../loading';
import InfoBox from '../../infoBox';
import { EffectiveTariff } from '../../billingForm/style';
import {
  moneyFormat,
  MonthKey,
  NameMonth,
} from '@/app/(private)/billings/create/utils';
import {
  OutsideModalContainer,
  ModalContainer,
  ModalContentContainer,
} from '../style';

interface BillingDetailModalProps {
  onClose(): void;
  billingId: number;
}

const BillingDetailModal = ({
  billingId,
  onClose,
}: BillingDetailModalProps) => {
  const { billingDetail, isDetailLoading } = useGetBillingDetail(billingId);
  return (
    <OutsideModalContainer>
      <ModalContainer>
        {isDetailLoading ? (
          <div
            style={{
              justifyItems: 'center',
            }}
          >
            <MiniIdeaLoader isToast={false} />
            <StyledText
              color="darkBlue"
              size={14}
              weight={500}
              style={{ marginTop: 8 }}
            >
              Já estamos trazendo seus dados...
            </StyledText>
          </div>
        ) : (
          <ModalContentContainer>
            <ModalHeaderContainer>
              <StyledText color="darkBlue" size={16} weight={700}>
                {billingDetail?.apelido}
              </StyledText>
              <CloseModalIcon
                color={colors.darkBlue}
                size={20}
                onClick={onClose}
              />
            </ModalHeaderContainer>
            <InfoBoxContainer>
              <InfoBox
                color="cyanBlue"
                title="Valor total"
                value={moneyFormat(billingDetail?.valorTotal || 0)}
                fillAll
              />
              <InfoBox
                color="yellow"
                title="Consumo total"
                value={`${billingDetail?.consumoTotalKwh} kWh`}
                fillAll
              />
            </InfoBoxContainer>
            <EffectiveTariff color="lightGreen">
              <StyledText color="darkGreen" size={12} weight={700}>
                TARIFA EFETIVA CALCULADA
              </StyledText>
              <StyledText color="darkBlue" size={20} weight={700}>
                R$ {billingDetail?.tarifaEfetiva}/kWh
              </StyledText>
              <StyledText color="darkGray" size={10} weight={500}>
                {moneyFormat(billingDetail?.valorTotal || 0)} ÷{' '}
                {billingDetail?.consumoTotalKwh} kWh
              </StyledText>
            </EffectiveTariff>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <StyledText color="darkGray" size={12} weight={400}>
                Período de referência
              </StyledText>
              <StyledText color="darkGray" size={12} weight={700}>
                {NameMonth[billingDetail?.mesReferencia as MonthKey]}/
                {billingDetail?.anoReferencia}
              </StyledText>
            </div>
          </ModalContentContainer>
        )}
      </ModalContainer>
    </OutsideModalContainer>
  );
};

export default BillingDetailModal;
