import { StyledText } from '@/components/text';
import { colors } from '@/components/theme';
import { MoveLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { ReactNode } from 'react';

interface PrivateProps {
  backOption?: boolean;
  pageTitle: string;
  pageSubtitle: string;
  children: ReactNode;
}

const PrivateLayout = ({
  backOption,
  pageTitle,
  pageSubtitle,
  children,
}: PrivateProps) => {
  const router = useRouter();
  return (
    <>
      {backOption && (
        <StyledText
          color="cyanBlue"
          cursor="pointer"
          size={14}
          weight={500}
          onClick={() => {
            router.back();
          }}
        >
          <MoveLeft color={colors.cyanBlue} size={12} fontWeight={500} /> Voltar
        </StyledText>
      )}
      <StyledText color="darkBlue" size={24} weight={700}>
        {pageTitle}
      </StyledText>
      <StyledText color="darkGray" size={12} weight={400}>
        {pageSubtitle}
      </StyledText>
      {children}
    </>
  );
};

export default PrivateLayout;
