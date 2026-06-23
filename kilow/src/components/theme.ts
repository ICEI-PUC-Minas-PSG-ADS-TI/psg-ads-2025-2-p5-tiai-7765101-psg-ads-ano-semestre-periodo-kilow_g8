export const colors = {
  yellow: '#FFD23F',
  darkBlue: '#192C3A',
  cyanBlue: '#2D5D7B',
  black: '#0F0F0F',
  red: '#dc2626',
  lightRed: '#fef2f2',
  lightGray: '#EEEBE4',
  lightOrange: '#fff5e8',
  mediumGray: '#9E9E9E',
  backgroundGray: '#F9F7F2',
  backgroundWhite: '#FFF',
  darkGray: '#6b7280',
  darkGreen: '#1d820e',
  lightGreen: '#dcfce7',
};

export interface ButtonVariantStyle {
  backgroundColor: string;
  color: string;
  border?: string;
}

export type ButtonVariants =
  | 'darkBlue'
  | 'yellow'
  | 'transparent'
  | 'gray'
  | 'white'
  | 'red'
  | 'lightRed'
  | 'white_cyan';

export type ButtonSizes = 'large' | 'normal' | 'small';

export type BoxSizes = Omit<ButtonSizes, 'large'>;

export const buttonsVariantsProps: Record<ButtonVariants, ButtonVariantStyle> =
  {
    darkBlue: {
      backgroundColor: colors.darkBlue,
      color: colors.yellow,
    },
    gray: {
      backgroundColor: colors.lightGray,
      color: colors.darkBlue,
    },
    transparent: {
      backgroundColor: 'transparent',
      color: colors.darkBlue,
    },
    yellow: {
      backgroundColor: colors.yellow,
      color: colors.darkBlue,
    },
    white: {
      backgroundColor: colors.backgroundWhite,
      color: colors.darkBlue,
    },
    red: {
      backgroundColor: colors.red,
      color: colors.backgroundWhite,
    },
    lightRed: {
      backgroundColor: colors.lightRed,
      color: colors.red,
    },
    white_cyan: {
      backgroundColor: colors.backgroundWhite,
      color: colors.darkBlue,
      border: colors.cyanBlue,
    },
  };

export const buttonsSizesProps = {
  normal: {
    padding: 12,
    fontSize: 16,
    fontWeight: 600,
  },
  large: {
    padding: 8,
    fontSize: 24,
    fontWeight: 600,
  },
  small: {
    padding: 8,
    fontSize: 12,
    fontWeight: 600,
  },
};

export const inputVariants = {
  small: {
    labelColor: 'darkBlue',
    labelFontSize: 13,
    labelFontWeight: 700,
  },
  large: {
    labelColor: 'black',
    labelFontSize: 16,
    labelFontWeight: 400,
  },
};

export type ColorsType = keyof typeof colors;
