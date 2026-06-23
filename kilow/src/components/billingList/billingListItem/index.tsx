import { IBilling } from '@/actions/types/billing';
import { StyledText } from '@/components/text';
import {
  BillingDateContainer,
  BillingInfoContainer,
  ListBillingItemContainer,
} from './style';
import Button from '@/components/button';
import {
  MonthKey,
  moneyFormat,
  AbbreviatedMonthName,
} from '@/app/(private)/billings/create/utils';
import { BillingActionType } from '..';

interface BillingListItemProps {
  billingItem: IBilling;
  onAction(actionType: BillingActionType, id: number): void;
}

const BillingsListItem = ({ billingItem, onAction }: BillingListItemProps) => {
  return (
    <>
      <ListBillingItemContainer>
        <div style={{ display: 'flex', gap: 12 }}>
          <BillingDateContainer>
            <StyledText color="darkGray" size={10} weight={700}>
              {AbbreviatedMonthName[
                billingItem.mesReferencia as MonthKey
              ].toUpperCase()}
            </StyledText>
            <StyledText color="darkBlue" size={12} weight={700}>
              {billingItem.anoReferencia}
            </StyledText>{' '}
          </BillingDateContainer>
          <BillingInfoContainer>
            <StyledText color="darkBlue" size={12} weight={700}>
              {billingItem.apelido}
            </StyledText>
            <StyledText color="darkGray" size={10} weight={500}>
              {billingItem.consumoTotalKwh} kWh · Tarifa efetiva:{' '}
              <StyledText as="span" color="cyanBlue" size={10} weight={700}>
                R$ {billingItem.tarifaEfetiva}/kWh
              </StyledText>
            </StyledText>
          </BillingInfoContainer>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <StyledText
            color="darkBlue"
            size={16}
            weight={700}
            style={{ padding: 4 }}
          >
            {moneyFormat(billingItem?.valorTotal || 0)}
            <StyledText
              color="darkGray"
              size={10}
              weight={400}
              style={{ textAlign: 'right' }}
            >
              total da conta
            </StyledText>
          </StyledText>
          <Button
            size="small"
            variant="white_cyan"
            onClick={() => {
              onAction('detail', billingItem.id);
            }}
          >
            Visualizar
          </Button>
          <Button
            size="small"
            variant="lightRed"
            onClick={() => {
              onAction('delete', billingItem.id);
            }}
          >
            Excluir
          </Button>
        </div>
      </ListBillingItemContainer>
    </>
  );
};

export default BillingsListItem;
