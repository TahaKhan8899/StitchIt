/* istanbul ignore file */
const SystemColor = {
  primaryColor: {
    textBlack: '#000000',
    bgBlue: '#13202A',
    bgAccentBlue: '#182530',
    brightTeal: '#16FFFB',
    activeTeal: '#166266',
    chartTeal: '#308F97',
  },
  greys: {
    chartLineGrey: '#97ACB7',
    dividerOnGrey: '#DAE0E6',
    divOnWhite: '#ECECEC',
    chartHighlightBg: '#EEF0F2',
    pageBgGrey: '#F6F7F8',
    white: '#FFFFFF',
  },
  uiElements: {
    errorRed: '#fa3737',
    loadingYellow: '#f1b411',
    buttonOrange: '#f0c040',
    formBackground: '#f0f1f5',
  },
}

const breakPointValue = {
  xs: 400,
  sm: 700,
  md: 929,
  lg: 1230,
  xl: 1231,
}

const breakPoints = {
  xs: `(max-width: ${breakPointValue.xs}px)`,
  sm: `(min-width: ${breakPointValue.xs + 1}px) and (max-width: ${breakPointValue.sm}px)`,
  md: `(min-width: ${breakPointValue.sm + 1}px) and (max-width: ${breakPointValue.md}px)`,
  lg: `(min-width: ${breakPointValue.md + 1}px) and (max-width: ${breakPointValue.lg}px)`,
  xl: `(min-width: ${breakPointValue.xl}px)`,
  lg_under: `(max-width: ${breakPointValue.lg}px)`,
  md_under: `(max-width: ${breakPointValue.md}px)`,
  sm_under: `(max-width: ${breakPointValue.sm}px)`,
  xs_under: `(max-width: ${breakPointValue.xs}px)`,
}

const SystemSpacing = {
  xxxSmall: '5px',
  xxSmall: '10px',
  xSmall: '20px',
  small: '40px',
  medium: '80px',
  large: '160px',
  xLarge: '320px',
}

export { SystemColor, breakPoints, breakPointValue, SystemSpacing }
