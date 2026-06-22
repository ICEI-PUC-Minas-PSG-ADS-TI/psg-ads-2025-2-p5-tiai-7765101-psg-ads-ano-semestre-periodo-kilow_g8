import { colors } from '@/components/theme';
import styled, { keyframes } from 'styled-components';
import Image from 'next/image';

export const LateralBlueContainer = styled.div`
  width: 35%;
  background-color: ${colors.darkBlue};
  padding: 48px;
  gap: 48px;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden;
`;

interface BubbleProps {
  $size: string;
  $top?: string;
  $left?: string;
  $right?: string;
  $bottom?: string;
  $color: string;
}

export const BackgroundBubble = styled.div<BubbleProps>`
  position: absolute;
  border-radius: 50%;
  width: ${(props) => props.$size};
  height: ${(props) => props.$size};

  top: ${(props) => props.$top || 'auto'};
  bottom: ${(props) => props.$bottom || 'auto'};
  left: ${(props) => props.$left || 'auto'};
  right: ${(props) => props.$right || 'auto'};

  background: ${(props) => props.$color};
  opacity: 0.5;
  filter: blur(1px);

  z-index: 0;
  pointer-events: none;
`;

const lineGlow = keyframes`
  50% {
    filter: drop-shadow(0 0 6px #ffd60a80);
  }
`;

export const GlowImage = styled(Image)`
  animation: ${lineGlow} 2s ease-in-out infinite;
`;

//criar componente (fazer)
export const HorizontalLogoLine = styled.div<{ position: number }>`
  position: relative;
  width: 60%;
  background-color: ${colors.yellow};
  border-radius: 100px;
  height: 8px;
  margin-left: ${({ position }) => position}px;
`;

export const LogoContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 24px;
  justify-content: center;
`;

export const FormWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

export const DecorativeImage = styled.img`
  position: absolute;
  right: 5%;
  top: 0;
  width: 40%;
  z-index: -1;
`;

export const ContentContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-left: 120px;
`;

export const FormContainer = styled.form`
  max-width: 50%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Divider = styled.div`
  background-color: ${colors.darkBlue};
  height: 1px;
  width: 100%;
`;

export const FooterText = styled.p`
  text-align: center;
  color: ${colors.darkGray};

  span {
    cursor: pointer;
    color: ${colors.cyanBlue};
    font-weight: bold;
    transition: opacity 0.2s;

    &:hover {
      opacity: 0.8;
    }
  }
`;

export const AuthPageContent = styled.div<{
  $bannerPosition: 'left' | 'right';
}>`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  padding-left: ${({ $bannerPosition }) =>
    $bannerPosition === 'right' ? 120 : 0};
`;
