import { useState, useRef } from 'react'
import './Custom-tooltip.scss'

function CustomTooltip({ title, children }) {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)

  return (
    <span
      className="custom-tooltip-wrapper"
      ref={ref}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      tabIndex={0}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      style={{ position: 'relative', display: 'inline-block' }}
    >
      {children}
      {visible && (
        <span className="custom-tooltip-bubble">
          {title}
        </span>
      )}
    </span>
  )
}

export default CustomTooltip
