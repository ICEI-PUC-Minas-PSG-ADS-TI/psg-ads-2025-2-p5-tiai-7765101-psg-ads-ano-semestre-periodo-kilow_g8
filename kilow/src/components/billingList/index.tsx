import { useState } from 'react';
import { StyledText } from '../text';
import BillingsListItem from './billingListItem';
import { BillingListContainer } from './style';
import { IBilling } from '@/actions/types/billing';
import BillingDetailModal from './billingDetailModal';
import BillingDeleteModal from './billingDeleteModal';

export type BillingActionType = 'detail' | 'delete' | 'update';

interface BillingListProps {
  billingList: IBilling[];
  totalBillings: number;
  reloadPageFuntion(): void;
}

const BillingList = ({
  billingList,
  totalBillings,
  reloadPageFuntion,
}: BillingListProps) => {
  const [modalsActions, setModalsActions] = useState<{
    type: BillingActionType;
    id: number;
  } | null>(null);

  const closeModals = () => setModalsActions(null);
  return (
    <>
      <BillingListContainer>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <StyledText color="darkBlue" size={15} weight={750}>
            Contas
          </StyledText>
          <StyledText color="darkGray" size={11} weight={400}>
            {totalBillings} contas cadastradas
          </StyledText>
        </div>

        {billingList.map((billing) => (
          <BillingsListItem
            key={billing.id}
            billingItem={billing}
            onAction={(type, id) => setModalsActions({ type, id })}
          />
        ))}
      </BillingListContainer>
      {modalsActions?.type === 'delete' && (
        <BillingDeleteModal
          billingId={modalsActions.id}
          onClose={closeModals}
          onSuccess={() => {
            reloadPageFuntion();
            closeModals();
          }}
        />
      )}
      {modalsActions?.type === 'detail' && (
        <BillingDetailModal
          billingId={modalsActions.id}
          onClose={closeModals}
        />
      )}
    </>
  );
};

export default BillingList;
