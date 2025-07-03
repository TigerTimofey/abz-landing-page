import CustomRadio from '../../utils/custom-radio/CustomRadio'

function UserFields({
  fields,
  errors,
  focus,
  positions,
  photoLabel,
  photoInputRef,
  onChange,
  onFocus,
  onBlur,
  onPositionFocus,
  onPositionBlur,
  onPhotoClick,
}) {
  return (
    <>
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
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
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
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
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
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
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
          onFocus={onPositionFocus}
          onBlur={onPositionBlur}
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
              onChange={onChange}
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
          onChange={onChange}
        />
        <button
          type="button"
          className="signup-upload-btn"
          onClick={onPhotoClick}
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
    </>
  )
}

export default UserFields
