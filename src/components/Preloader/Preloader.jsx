import './preloader.scss'

function Preloader() {
  return (
    <div className="preloader-demo">
      <span style={{ opacity: 0 }}>Loading</span>
      <div>
        <svg width="48" height="48" viewBox="0 0 48 48">
          <circle
            cx="24"
            cy="24"
            r="20"
            fill="none"
            stroke="var(--color-secondary, #00BDD3)"
            strokeWidth="4"
            strokeDasharray="100"
            strokeDashoffset="60"
            strokeLinecap="round"
            style={{
              animation: 'preloader-spin 1s linear infinite'
            }}
          />
        </svg>
      </div>
    </div>
  )
}

export default Preloader
