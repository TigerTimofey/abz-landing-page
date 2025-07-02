import './preloader.scss'

function Preloader() {
  return (
    <div className="preloader-demo">
      <span style={{ opacity: 0 }}>Loading</span>
      <div>
        <svg width="28" height="28" viewBox="0 0 28 28">
          <circle
            cx="14"
            cy="14"
            r="10"
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
