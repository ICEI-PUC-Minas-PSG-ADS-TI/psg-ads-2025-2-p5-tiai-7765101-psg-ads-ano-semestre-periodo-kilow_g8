'use client';
import Button from '@/components/button';
import { useRouter } from 'next/navigation';
import PrivateLayout from '@/components/Layout/privateSection';
import BillingList from '@/components/billingList';
import InfoBox from '@/components/infoBox';
import { useGetBillings } from '@/hooks/useGetBillings';
import { InfoAlert } from '@/components/imageUpload/style';
import { StyledLinkText, StyledText } from '@/components/text';
import { colors } from '@/components/theme';
import { Info } from 'lucide-react';
import {
  BillingsInfosContainer,
  EmptyListContainer,
  HighlightedText,
  NewBillingButtonContainer,
} from './style';
import Image from 'next/image';
const BillingPage = () => {
  const router = useRouter();
  const { billingListData, isLoading, success, refetch } = useGetBillings();
  const newBillingRedirect = () => router.push('/billings/create');

  return (
    <PrivateLayout
      pageTitle="Gestão de Contas"
      pageSubtitle="Maneje aqui as suas contas de luz já cadastradas"
    >
      <NewBillingButtonContainer>
        <Button onClick={newBillingRedirect}>+ Nova conta</Button>
      </NewBillingButtonContainer>
      {!isLoading && success && billingListData && (
        <>
          <InfoAlert>
            <Info
              fill={colors.cyanBlue}
              stroke={colors.backgroundWhite}
              strokeWidth={2}
              size={28}
            />
            <StyledText
              color="darkBlue"
              size={13}
              weight={550}
              style={{ lineHeight: 1.6 }}
            >
              Sabia que você pode usar IA para cadastrar suas contas de luz com
              apenas uma foto? Basta selecionar a opção{' '}
              <HighlightedText>Foto da fatura</HighlightedText> quando estiver
              cadastrando uma nova e fazer o upload ;)
            </StyledText>
          </InfoAlert>
          {billingListData?.total > 0 ? (
            <>
              <BillingsInfosContainer>
                <InfoBox
                  color="darkGreen"
                  title="Tarifa média efetiva"
                  value={`R$ ${billingListData?.tarifaMediaEfetiva}/kWh`}
                  subtitle="Calculada sobre as faturas cadastradas"
                  info="Calculada somando o valor total de todas as suas faturas e dividindo pelo consumo total em kWh — assim, meses de maior consumo pesam mais no cálculo, refletindo melhor quanto você realmente paga por kWh."
                />

                <InfoBox
                  color="darkGreen"
                  title="Conta mais cara"
                  value={`${billingListData?.contaMaisCara.apelido} - R$ ${billingListData?.contaMaisCara.valorTotal}`}
                  subtitle="Conta com maior valor total"
                />
              </BillingsInfosContainer>

              <BillingList
                billingList={billingListData.contas}
                totalBillings={billingListData.total}
                reloadPageFuntion={refetch}
              />
            </>
          ) : (
            <>
              <EmptyListContainer>
                <StyledText color="darkBlue" size={24} weight={450}>
                  Você ainda não tem nenhuma conta de luz cadastrada :(
                </StyledText>

                <Image
                  src={'/assets/loginImage2.png'}
                  width={450}
                  height={450}
                  alt="homeImage"
                />
                <StyledText
                  color="darkGray"
                  size={15}
                  weight={400}
                  style={{ textAlign: 'center', marginBlock: 12 }}
                >
                  <StyledLinkText onClick={newBillingRedirect}>
                    Clique aqui
                  </StyledLinkText>{' '}
                  ou no botão <b>+ Nova conta</b> para começar a ter suas contas
                  guardadas!
                </StyledText>
              </EmptyListContainer>
            </>
          )}
        </>
      )}
    </PrivateLayout>
  );
};

export default BillingPage;
