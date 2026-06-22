import { Tooltip } from '@base-ui/react/tooltip';
import { Info } from 'lucide-react';
import { colors, ColorsType } from '../theme';
import { StyledText } from '../text';
import { StyledTooltipIcon } from './style';

interface TooltipProps {
  text: string;
  color?: ColorsType;
}

const StyledTooltip = ({ color = 'cyanBlue', text }: TooltipProps) => {
  return (
    <Tooltip.Provider delay={100}>
      <Tooltip.Root>
        <StyledTooltipIcon>
          <Info stroke={colors[color]} size={13} />
        </StyledTooltipIcon>

        <Tooltip.Portal>
          <Tooltip.Positioner side="right" sideOffset={8}>
            <Tooltip.Popup
              style={{
                backgroundColor: colors[color],
                padding: 12,
                borderRadius: 8,
              }}
            >
              <StyledText
                color="backgroundWhite"
                size={10}
                weight={500}
                maxWidth={240}
              >
                {text}
              </StyledText>
            </Tooltip.Popup>
          </Tooltip.Positioner>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default StyledTooltip;
