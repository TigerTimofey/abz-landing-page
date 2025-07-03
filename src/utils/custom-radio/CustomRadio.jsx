import './Custom-radio.scss'

function CustomRadio({ checked, onChange, name, value, ...props }) {
  return (
    <label className="custom-radio">
      <input
        type="radio"
        checked={checked}
        onChange={onChange}
        name={name}
        value={value}
        {...props}
      />
      <span className="custom-radio-icon" />
      {props.label && <span className="custom-radio-label">{props.label}</span>}
    </label>
  )
}

export default CustomRadio
