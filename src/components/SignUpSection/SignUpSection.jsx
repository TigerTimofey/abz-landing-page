import { useEffect, useState } from 'react'
import './SignUpSection.scss'
import CustomRadio from '../../utils/custom-radio/CustomRadio'
import { getPositions } from '../../services/api'
import { isEmail } from '../../utils/validation/isEmail'
import { isNumber, filterPhoneInput } from '../../utils/validation/isNumber'

function SignUpSection() {
  const [positions, setPositions] = useState([])
  const [fields, setFields] = useState({
    name: '',
    email: '',
    phone: '',
    position: ''
  })
  const [focus, setFocus] = useState({
    name: false,
    email: false,
    phone: false,
    position: false
  })
  const [errors, setErrors] = useState({
    email: '',
    phone: '',
    position: ''
  })

  useEffect(() => {
    getPositions().then(data => {
      setPositions(data.positions || [])
    })
  }, [])

  const handleChange = e => {
    const { name, value } = e.target
    if (name === 'phone') {
      const filtered = filterPhoneInput(value)
      setFields({ ...fields, [name]: filtered })
      setErrors(errors => ({
        ...errors,
        phone: filtered && !isNumber(filtered) ? 'Invalid phone' : ''
      }))
      return
    }
    setFields({ ...fields, [name]: value })

    if (name === 'email') {
      setErrors(errors => ({
        ...errors,
        email: value && !isEmail(value) ? 'Invalid email' : ''
      }))
    }
    if (name === 'position') {
      setErrors(errors => ({
        ...errors,
        position: value ? '' : 'Please select your position'
      }))
    }
  }
  const handleFocus = e => {
    setFocus({ ...focus, [e.target.name]: true })
  }
  const handleBlur = e => {
    setFocus({ ...focus, [e.target.name]: false })
  }

  const handlePositionBlur = () => {
    setFocus(f => ({ ...f, position: false }))
    setErrors(errors => ({
      ...errors,
      position: fields.position ? '' : 'Please select your position'
    }))
  }

  const isFormValid =
    fields.name.trim() &&
    fields.email.trim() &&
    fields.phone.trim() &&
    fields.position &&
    !errors.email &&
    !errors.phone &&
    !errors.position

  return (
    <section className="signup-section">
      <h2 className="signup-section__title">Working with POST request</h2>
      <form className="signup-form">
        <div className="coolinput">
          <label
            className={
              'text' +
              ((focus.name || fields.name) ? ' text--active' : '')
            }
            htmlFor="signup-name"
          >
            Your name
          </label>
          <input
            className="signup-input input"
            id="signup-name"
            type="text"
            name="name"
            value={fields.name}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder=""
            autoComplete="off"
          />
        </div>
        {/* Email input */}
        <div className="coolinput">
          <label
            className={
              'text' +
              ((focus.email || fields.email) ? ' text--active' : '') +
              (errors.email ? ' text--error' : '')
            }
            htmlFor="signup-email"
          >
            Email
          </label>
          <input
            className={
              "signup-input input" +
              (errors.email ? " input--error" : "")
            }
            id="signup-email"
            type="email"
            name="email"
            value={fields.email}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder=""
            autoComplete="off"
          />
          {errors.email && (
            <div className="signup-hint" style={{ color: '#ea5924' }}>
              {errors.email}
            </div>
          )}
        </div>
        {/* Phone input */}
        <div className="coolinput">
          <label
            className={
              'text' +
              ((focus.phone || fields.phone) ? ' text--active' : '') +
              (errors.phone ? ' text--error' : '')
            }
            htmlFor="signup-phone"
          >
            Phone
          </label>
          <input
            className={
              "signup-input input" +
              (errors.phone ? " input--error" : "")
            }
            id="signup-phone"
            type="tel"
            name="phone"
            value={fields.phone}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder=""
            autoComplete="off"
          />
          {!errors.phone && (
            <div className="signup-hint signup-hint--phone">
              +38 (XXX) XXX - XX - XX
            </div>
          )}
          {errors.phone && (
            <div className="signup-hint signup-hint--error">
              {errors.phone}
            </div>
          )}
        </div>
        {/* Position input */}
        <div className="coolinput">
          <div
            className={
              'signup-radio-title' +
              (focus.position ? ' text--active' : '') +
              (errors.position ? ' text--error' : '')
            }
            tabIndex={0}
            onFocus={() => setFocus(f => ({ ...f, position: true }))}
            onBlur={handlePositionBlur}
          >
            Select your position
          </div>
          <div className="signup-radio-group">
            {positions.map(pos => (
              <CustomRadio
                key={pos.id}
                name="position"
                value={pos.id}
                label={pos.name}
                checked={fields.position === String(pos.id)}
                onChange={handleChange}
              />
            ))}
          </div>
          {errors.position && (
            <div className="signup-hint">
              {errors.position}
            </div>
          )}
        </div>
        <div className="signup-upload">
          <button type="button" className="signup-upload-btn">Upload</button>
          <span className="signup-upload-label">Upload your photo</span>
        </div>
        <button
          className="button-yellow signup-submit"
          type="submit"
          disabled={!isFormValid}
        >
          Sign up
        </button>
      </form>
    </section>
  )
}

export default SignUpSection
