/* istanbul ignore file */
import { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import { breakpointFns } from 'utils/breakpointFns'
import _ from 'lodash'

function ShowForSizes({ children, showOnlyFor, hideOnlyFor }) {
  const checkVisibility = useCallback(() => {
    return (
      _.some(showOnlyFor, (size) => breakpointFns[size]()) ||
      !_.some(hideOnlyFor, (size) => breakpointFns[size]())
    )
  }, [showOnlyFor, hideOnlyFor])

  const [isVisible, setIsVisible] = useState(checkVisibility())
  const [resizeTimeout, setResizeTimeout] = useState(null)

  const updateIsVisible = useCallback(() => {
    clearTimeout(resizeTimeout)
    setResizeTimeout(setTimeout(() => setIsVisible(checkVisibility()), 100))
  }, [checkVisibility, resizeTimeout])

  useEffect(() => {
    window.addEventListener('resize', updateIsVisible)

    return function cleanup() {
      window.removeEventListener('resize', updateIsVisible)
      clearTimeout(resizeTimeout)
    }
  }, [updateIsVisible, resizeTimeout])

  return isVisible ? children : null
}

ShowForSizes.propTypes = {
  showOnlyFor: PropTypes.array,
  hideOnlyFor: PropTypes.array,
}

ShowForSizes.defaultProps = {
  showOnlyFor: [],
  hideOnlyFor: ['xs', 'sm', 'md', 'lg', 'xl'],
}

export default ShowForSizes
