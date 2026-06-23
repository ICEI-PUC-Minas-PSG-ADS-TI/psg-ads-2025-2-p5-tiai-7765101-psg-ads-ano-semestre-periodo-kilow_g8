import { Toast } from '@base-ui/react';
import MiniIdeaLoader from '@/components/loading';

export const useAppToast = () => {
  const toastManager = Toast.useToastManager();

  const showError = (
    description: string,
    title = 'Ops... algo saiu errado!',
  ) => {
    toastManager.add({
      title,
      description,
    });
  };

  const showSuccess = (description: string, title = 'Sucesso!') => {
    toastManager.add({
      title,
      description,
    });
  };

  const showLoading = (description: string, title = 'Carregando') => {
    toastManager.add({
      title,
      description: (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <p>{description}</p>
          <MiniIdeaLoader />
        </div>
      ),
      id: 'loadingToast',
    });
  };

  const removeLoading = () => {
    toastManager.close('loadingToast');
  };

  return {
    showError,
    showSuccess,
    showLoading,
    removeLoading,
  };
};
