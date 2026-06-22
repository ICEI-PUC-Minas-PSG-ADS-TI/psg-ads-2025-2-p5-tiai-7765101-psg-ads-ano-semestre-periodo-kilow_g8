import { ReactNode } from 'react';

import { StyledText } from '@/components/text';
import { colors } from '@/components/theme';
import {
  AuthPageContent,
  BackgroundBubble,
  GlowImage,
  HorizontalLogoLine,
  LateralBlueContainer,
  LogoContainer,
} from './style';

interface IAuthLayoutProps {
  children: ReactNode;
  bannerText: string;
  bannerImageSrc: string;
  bannerPosition: 'left' | 'right';
}

const AuthLayout = ({
  children,
  bannerText,
  bannerImageSrc,
  bannerPosition,
}: IAuthLayoutProps) => {
  const direction = bannerPosition === 'right' ? 'row-reverse' : 'row';
  return (
    <div style={{ display: 'flex', flex: 1, flexDirection: direction }}>
      <LateralBlueContainer>
        <BackgroundBubble
          $size="450px"
          $top="-150px"
          $left="-200px"
          $color={`${colors.cyanBlue}50`}
        />

        <BackgroundBubble
          $size="350px"
          $bottom="-220px"
          $right="-90px"
          $color={`${colors.yellow}20`}
        />

        <div>
          <HorizontalLogoLine position={220}>{'  '}</HorizontalLogoLine>
          <LogoContainer>
            <StyledText color="yellow" size={76} weight={600}>
              KiloW
            </StyledText>
            <GlowImage
              src="/assets/Greentech.png"
              alt="icone"
              width={75}
              height={77}
            />
          </LogoContainer>
          <HorizontalLogoLine position={-28}>{'  '}</HorizontalLogoLine>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent:
              bannerPosition === 'left' ? 'flex-end' : 'flex-start',
          }}
        >
          <StyledText
            color="backgroundGray"
            size={28}
            weight={350}
            maxWidth={360}
            textAlign={bannerPosition === 'left' ? 'right' : 'left'}
          >
            {bannerText}
          </StyledText>
        </div>

        <img
          src={bannerImageSrc}
          alt="Ilustração KiloW"
          width="100%"
          style={{ position: 'relative' }}
        />
      </LateralBlueContainer>

      <AuthPageContent $bannerPosition={bannerPosition}>
        {children}
      </AuthPageContent>
    </div>
  );
};
export default AuthLayout;
