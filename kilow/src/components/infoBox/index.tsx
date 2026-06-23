import React from 'react';
import { ColorsType } from '../theme';
import { InfoBoxContainer } from './style';
import { StyledText } from '../text';
import StyledTooltip from '../tooltip';

interface InfoBoxProps {
  color: ColorsType;
  children?: React.ReactNode;
  title: string;
  value: string;
  subtitle?: string;
  info?: string;
  fillAll?: boolean;
}

const InfoBox = ({
  color,
  children,
  title,
  value,
  subtitle,
  info,
  fillAll = false,
}: InfoBoxProps) => {
  return (
    <InfoBoxContainer topBorderColor={color} fillContainer={fillAll}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <StyledText color="darkGray" weight={700} size={10}>
          {title.toUpperCase()}
        </StyledText>
        {info && <StyledTooltip text={info} color="darkGray" />}
      </div>

      <StyledText
        color="darkBlue"
        weight={700}
        size={20}
        style={{ whiteSpace: 'nowrap' }}
      >
        {value}
      </StyledText>
      {subtitle && (
        <StyledText
          color="darkGray"
          size={10}
          weight={450}
          style={{ whiteSpace: 'nowrap' }}
        >
          {subtitle}
        </StyledText>
      )}
      {children}
    </InfoBoxContainer>
  );
};

export default InfoBox;
