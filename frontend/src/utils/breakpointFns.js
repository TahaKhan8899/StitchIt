/* istanbul ignore file */
import { breakPoints } from 'globalConstants'

const breakpointFns = {
  xs: () => window.matchMedia(breakPoints.xs).matches,
  sm: () => window.matchMedia(breakPoints.sm).matches,
  md: () => window.matchMedia(breakPoints.md).matches,
  lg: () => window.matchMedia(breakPoints.lg).matches,
  xl: () => window.matchMedia(breakPoints.xl).matches,
}

// eslint-disable-next-line
export { breakpointFns }
