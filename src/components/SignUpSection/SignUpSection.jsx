import { useEffect, useState, useRef } from 'react'
import './signUpSection.scss'
import CustomRadio from '../../utils/custom-radio/CustomRadio'
import { getPositions, getToken, registerUser } from '../../services/api'
import { isEmail } from '../../utils/validation/isEmail'
import { isNumber, filterPhoneInput } from '../../utils/validation/isNumber'
import PopupError from '../PopupError/PopupError'
import successImage from '../../assets/success-image.svg'

function validateName(name) {
  return name.trim().length >= 2 && name.trim().length <= 60
}

function validatePhoto(file, cb) {
  if (!file) return 'Photo is required'
  if (!['image/jpeg', 'image/jpg'].includes(file.type)) return 'Photo must be JPEG/JPG'
  if (file.size > 5 * 1024 * 1024) return 'Photo must not exceed 5MB'

  const img = new window.Image()
  const url = URL.createObjectURL(file)
  img.onload = () => {
    if (img.width < 70 || img.height < 70) cb('Min resolution is 70x70px')
    else cb('')
    URL.revokeObjectURL(url)
  }
  img.onerror = () => {
    cb('Invalid image')
    URL.revokeObjectURL(url)
  }
  img.src = url
  return null 
}

function SignUpSection({ onSuccess }) {
  const [positions, setPositions] = useState([])
  const [fields, setFields] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    photo: null,
  })
  const [focus, setFocus] = useState({
    name: false,
    email: false,
    phone: false,
    position: false,
    photo: false,
  })
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    photo: '',
    submit: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [photoLabel, setPhotoLabel] = useState('Upload your photo')
  const [popupError, setPopupError] = useState('')
  const [success, setSuccess] = useState(false)
  const photoInputRef = useRef()

  useEffect(() => {
    getPositions().then(data => {
      setPositions(data.positions || [])
    })
  }, [])

  useEffect(() => {
    if (!fields.photo) {
      setErrors(e => ({ ...e, photo: '' }))
      setPhotoLabel('Upload your photo')
      return
    }
    setPhotoLabel(fields.photo.name)
    const syncErr = validatePhoto(fields.photo, err => {
      setErrors(e => ({ ...e, photo: err }))
    })
    if (syncErr) setErrors(e => ({ ...e, photo: syncErr }))
  }, [fields.photo])

  useEffect(() => {
    if (!success) return
    const timer = setTimeout(() => setSuccess(false), 5000)
    return () => clearTimeout(timer)
  }, [success])

  const handleChange = e => {
    const { name, value, files } = e.target
    if (name === 'photo') {
      setFields(f => ({ ...f, photo: files[0] }))
      return
    }
    if (name === 'phone') {
      const filtered = filterPhoneInput(value)
      setFields(f => ({ ...f, [name]: filtered }))
      setErrors(errors => ({
        ...errors,
        phone: filtered && !isNumber(filtered) ? 'Phone must start with +380 and have 9 digits after' : ''
      }))
      return
    }
    setFields(f => ({ ...f, [name]: value }))

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
    if (name === 'name') {
      setErrors(errors => ({
        ...errors,
        name: value && !validateName(value) ? 'Name must be 2-60 characters' : ''
      }))
    }
  }

  const handleFocus = e => {
    setFocus(f => ({ ...f, [e.target.name]: true }))
  }
  const handleBlur = e => {
    setFocus(f => ({ ...f, [e.target.name]: false }))
    if (e.target.name === 'name') {
      setErrors(errors => ({
        ...errors,
        name: fields.name && !validateName(fields.name) ? 'Name must be 2-60 characters' : ''
      }))
    }
  }
  const handlePositionBlur = () => {
    setFocus(f => ({ ...f, position: false }))
    setErrors(errors => ({
      ...errors,
      position: fields.position ? '' : 'Please select your position'
    }))
  }

  const handlePhotoClick = () => {
    photoInputRef.current?.click()
  }

  const isFormValid =
    validateName(fields.name) &&
    isEmail(fields.email) &&
    isNumber(fields.phone) &&
    fields.position &&
    fields.photo &&
    !errors.name &&
    !errors.email &&
    !errors.phone &&
    !errors.position &&
    !errors.photo

  const handleSubmit = async e => {
    e.preventDefault()
    setErrors(errs => ({ ...errs, submit: '' }))
    setPopupError('')
    if (!isFormValid) return
    setSubmitting(true)
    try {

      const tokenRes = await getToken()
      const token = typeof tokenRes === 'string' ? tokenRes : tokenRes.token

      const formData = new FormData()
      formData.append('name', fields.name.trim())
      formData.append('email', fields.email.trim())
      formData.append('phone', fields.phone.trim())
      formData.append('position_id', Number(fields.position))
      formData.append('photo', fields.photo)


      const res = await registerUser(formData, token)
      if (res.success) {
        setFields({
          name: '',
          email: '',
          phone: '',
          position: '',
          photo: null,
        })
        setPhotoLabel('Upload your photo')
        setErrors({})
        setSuccess(true)
        if (onSuccess) onSuccess()
      } else {
        // If token is invalid, try to get a new one and retry once
        if (res.message && res.message.includes('Invalid token')) {
          console.warn('Token was invalid, retrying with a new token...')
          const retryTokenRes = await getToken()
          const retryToken = typeof retryTokenRes === 'string' ? retryTokenRes : retryTokenRes.token
          const retryRes = await registerUser(formData, retryToken)
          if (retryRes.success) {
            setFields({
              name: '',
              email: '',
              phone: '',
              position: '',
              photo: null,
            })
            setPhotoLabel('Upload your photo')
            setErrors({})
            setSuccess(true)
            if (onSuccess) onSuccess()
          } else {
            setErrors(errs => ({ ...errs, submit: retryRes.message || 'Registration failed' }))
            setPopupError(retryRes.message || 'Registration failed')
          }
        } else {
          setErrors(errs => ({ ...errs, submit: res.message || 'Registration failed' }))
          setPopupError(res.message || 'Registration failed')
        }
      }
    } catch {
      setErrors(errs => ({ ...errs, submit: 'Network error' }))
      setPopupError('Network error')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <>
      <PopupError message={popupError} onClose={() => setPopupError('')} />
      <section className="signup-section">
        {success ? (
          <div className="signup-success-message">
            <h2 className="signup-section__title">User successfully registered</h2>
            <img
              src={successImage}
              alt="Success"
              width={328}
              height={290}
              className="signup-success-image"
            />
          </div>
        ) : (
          <>
            <h2 className="signup-section__title">Working with POST request</h2>
            <form className="signup-form" onSubmit={handleSubmit} encType="multipart/form-data">
              {/* Name input */}
              <div className="coolinput">
                <label
                  className={
                    'text' +
                    ((focus.name || fields.name) ? ' text--active' : '') +
                    (errors.name ? ' text--error' : '')
                  }
                  htmlFor="signup-name"
                >
                  Your name
                </label>
                <input
                  className={
                    "signup-input input" +
                    (errors.name ? " input--error" : "")
                  }
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
                {errors.name && (
                  <div className="signup-hint" style={{ color: '#ea5924' }}>
                    {errors.name}
                  </div>
                )}
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
                      value={String(pos.id)}
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
              {/* Photo upload */}
              <div className="signup-upload">
                <input
                  type="file"
                  name="photo"
                  accept="image/jpeg,image/jpg"
                  style={{ display: 'none' }}
                  ref={photoInputRef}
                  onChange={handleChange}
                />
                <button
                  type="button"
                  className="signup-upload-btn"
                  onClick={handlePhotoClick}
                  tabIndex={0}
                >
                  Upload
                </button>
                <span className="signup-upload-label">{photoLabel}</span>
              </div>
              {errors.photo && (
                <div className="signup-hint" style={{ color: '#ea5924', marginBottom: 8 }}>
                  {errors.photo}
                </div>
              )}
              {/* Submit */}
              <button
                className="button-yellow signup-submit"
                type="suspeed@test.eebmit"
                disabled={!isFormValid || submitting}
              >
                {submitting ? 'Submitting...' : 'Sign up'}
              </button>
            </form>
          </>
        )}
      </section>
    </>
  )
}

export default SignUpSection
