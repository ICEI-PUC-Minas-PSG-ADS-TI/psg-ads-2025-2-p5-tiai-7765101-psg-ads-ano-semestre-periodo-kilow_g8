import { CircleCheck, FileUp, Info } from 'lucide-react';
import { StyledText } from '../text';
import { colors } from '../theme';
import { ImageUploadContainer, InfoAlert } from './style';
import React, { useRef } from 'react';
import { useUploadBillingImage } from '@/hooks/useUploadBillingImage';
import MiniIdeaLoader from '../loading';
import { useAppToast } from '@/hooks/useToast';
import { BillingImageComponent } from '../billingImage';
import BillingForm from '../billingForm';
import { BillingFormContainer } from '@/app/(private)/billings/create/style';

const ImageUpload = () => {
  const fileInputElementRef = useRef<HTMLInputElement>(null);
  const { fileUpload, isLoading, success } = useUploadBillingImage();
  const { showError } = useAppToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileInputElementRefValue = e.target.files?.[0];
    if (fileInputElementRefValue) {
      if (fileInputElementRefValue.size > 10485760)
        showError('O arquivo é muito grande! O tamanho máximo é de 10MB.');
      fileUpload(fileInputElementRefValue);
    }
  };

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
      onClick={() => fileInputElementRef.current?.click()}
    >
      {success && (
        <InfoAlert style={{ backgroundColor: colors.successGreen }}>
          <CircleCheck color={colors.darkGreen} size={16} />

          <StyledText color="darkGreen" size={10} weight={450}>
            <b>Dados extraídos com sucesso —</b> Confira e ajuste se necessário
            antes de salvar
          </StyledText>
        </InfoAlert>
      )}

      {success ? (
        <div style={{ display: 'flex', gap: 16 }}>
          <BillingFormContainer $width="65%">
            <BillingForm />
          </BillingFormContainer>
          <div style={{ flex: 1 }}>
            <BillingImageComponent />
          </div>
        </div>
      ) : (
        <ImageUploadContainer>
          {isLoading ? (
            <MiniIdeaLoader />
          ) : (
            <>
              <input
                type="file"
                accept="image/png, image/jpeg, application/pdf"
                ref={fileInputElementRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <FileUp size={32} color={colors.cyanBlue} />
              <StyledText color="darkBlue" size={12} weight={700}>
                Arraste ou clique para enviar o arquivo
              </StyledText>
              <StyledText color="darkTextGray" size={10} weight={500}>
                PDF, JPG ou PNG · até 10 MB{' '}
              </StyledText>
            </>
          )}
        </ImageUploadContainer>
      )}

      <InfoAlert>
        <Info
          fill={colors.cyanBlue}
          stroke={colors.backgroundWhite}
          strokeWidth={2}
          size={16}
        />

        <StyledText color="cyanBlue" size={10} weight={450}>
          <b>Uso de Inteligência Artificial —</b> A IA extrai automaticamente o
          valor total, consumo em kWh e período de referência da sua fatura.
        </StyledText>
      </InfoAlert>
    </div>
  );
};

export default ImageUpload;
