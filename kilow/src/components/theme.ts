export const colors = {
  yellow: '#FFD23F',
  darkBlue: '#192C3A',
  cyanBlue: '#2D5D7B',
  black: '#0F0F0F',
  white: '#F9F7F2',
  backgroundGray: '#F9F7F2',
  backgroundWhite: '#FFF',
  lightGray: '#EEEBE4',
  darkGray: '#9E9E9E',
  darkTextGray: '#6b7280',
  darkGreen: '#1d820e',
  lightOrange: '#fff5e8',
  successGreen: '#dcfce7',
};

export type ButtonVariants =
  | 'darkBlue'
  | 'yellow'
  | 'transparent'
  | 'gray'
  | 'white';
export type ButtonSizes = 'large' | 'normal' | 'small';

export const buttonsVariantsProps = {
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
};

export const buttonsSizesProps = {
  normal: {
    padding: 12,
    fontSize: 16,
    fontWeight: 600,
  },
  large: {
    padding: 8,
    fontSize: 26,
    fontWeight: 650,
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
