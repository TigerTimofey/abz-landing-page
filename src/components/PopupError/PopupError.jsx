import { useEffect } from 'react'
import './popupError.scss'

function PopupError({ message, onClose, duration = 4000 }) {
  useEffect(() => {
    if (!message) return
    const timer = setTimeout(() => {
      onClose && onClose()
    }, duration)
    return () => clearTimeout(timer)
  }, [message, onClose, duration])

  if (!message) return null

  return (
    <div className="popup-error">
      <span>{message}</span>
      <button className="popup-error__close" onClick={onClose} aria-label="Close">&times;</button>
    </div>
  )
}

export default PopupError
