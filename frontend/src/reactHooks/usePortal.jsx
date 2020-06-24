/* istanbul ignore file */
import React from 'react'
import ReactDOM from 'react-dom'

const modalRoot = document.getElementById('modal-root')

export default function usePortal() {
  const [el] = React.useState(document.createElement('div'))

  React.useEffect(() => {
    modalRoot.appendChild(el)

    return () => modalRoot.removeChild(el)
  }, [el])

  const Portal = React.useCallback(
    ({ children }) => {
      return ReactDOM.createPortal(children, el)
    },
    [el]
  )

  return Portal
}
