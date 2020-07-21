import React from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function Toast({ type, msg }) {
  switch (type) {
    case 'error':
      toast.error(msg)
      break
    default:
      break
  }

  return (
    <div>
      <ToastContainer />
    </div>
  )
}
