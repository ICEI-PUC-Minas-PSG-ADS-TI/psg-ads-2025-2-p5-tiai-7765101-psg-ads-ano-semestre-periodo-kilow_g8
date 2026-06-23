import { StyledText } from '../../text';

import MiniIdeaLoader from '../../loading';
import { useDeleteBillings } from '@/hooks/useDeleteBilling';
import Button from '@/components/button';
import { useEffect } from 'react';
import { colors } from '@/components/theme';
import {
  OutsideModalContainer,
  ModalContainer,
  ModalContentContainer,
} from '../style';

interface BillingDeleteModalProps {
  billingId: number;
  onClose(): void;
  onSuccess(): void;
}

const BillingDeleteModal = ({
  billingId,
  onClose,
  onSuccess,
}: BillingDeleteModalProps) => {
  const { handleDelete, isLoading, success } = useDeleteBillings();

  useEffect(() => {
    if (success) {
      onClose();
      onSuccess();
    }
  }, [success]);
  return (
    <OutsideModalContainer>
      <ModalContainer>
        {isLoading ? (
          <div
            style={{
              justifyItems: 'center',
            }}
          >
            <MiniIdeaLoader isToast={false} />
            <StyledText color="darkBlue" size={14} weight={500}>
              Já estamos excluindo sua conta...
            </StyledText>
          </div>
        ) : (
          <ModalContentContainer>
            <StyledText color="darkBlue" size={16} weight={700}>
              Deseja continuar?
            </StyledText>

            <StyledText color="darkBlue" size={12} weight={400}>
              Tenha ciência de que não é possível reverter essa operação. A
              única opção possível será cadastrar a conta novamente. Clique em{' '}
              <b>"Cancelar"</b> para voltar à tela anterior.
              <br />
              <br />
              Caso queira prosseguir, clique em <b>"Continuar"</b>.
            </StyledText>

            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                gap: 12,
                backgroundColor: colors.backgroundGray,
                padding: '16px 24px',
                borderRadius: '0px 0px 24px 24px',
                margin: '0px -24px -24px -24px',
                borderTop: `1px solid ${colors.lightGray}`,
              }}
            >
              <Button variant="white_cyan" onClick={onClose}>
                Cancelar
              </Button>
              <Button variant="red" onClick={() => handleDelete(billingId)}>
                Continuar
              </Button>
            </div>
          </ModalContentContainer>
        )}
      </ModalContainer>
    </OutsideModalContainer>
  );
};

export default BillingDeleteModal;
