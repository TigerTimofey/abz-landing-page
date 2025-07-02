import './styles/main.scss'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { ThemeProvider } from '@mui/material/styles'
import theme from './theme'
import reactLogo from './assets/react.svg'
import CircularProgress from '@mui/material/CircularProgress'
import CustomTooltip from './components/CustomTooltip'
import Avatar from '@mui/material/Avatar'
import CustomRadio from './components/CustomRadio'
import React, { useState } from 'react'

function App() {
  // Add state for radio group
  const [radioValue, setRadioValue] = useState('checked')

  return (
    <ThemeProvider theme={theme}>
      {/* Website Style Guide */}
      <section style={{ marginBottom: 48 }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Website Style Guide</h2>
        {/* Font family */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ fontFamily: 'Nunito, Arial, sans-serif', fontWeight: 400, fontSize: 32 }}>
            Aa
          </div>
          <div style={{ fontFamily: 'Nunito, Arial, sans-serif', fontWeight: 400, fontSize: 18 }}>
            Font family: Nunito<br />
            Styles: Regular 400
          </div>
        </div>
        {/* Typography */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ fontFamily: 'Nunito, Arial, sans-serif', fontWeight: 400, fontSize: 40, lineHeight: '40px', margin: 0 }}>
            The five boxing wizards jump quickly.
          </h1>
          <div style={{ fontFamily: 'Nunito, Arial, sans-serif', fontWeight: 400, fontSize: 16, lineHeight: '26px', margin: '24px 0 0 0' }}>
            Lorem ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a lectus vitae urna dignissim laoreet a eget arcu. Sed eget gravida nisl. Integer molestie purus velit, et efficitur quam porttitor ut. Vestibulum tincidunt odio at lacus ornare luctus.
          </div>
        </div>
        {/* Color palette */}
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: 'flex', gap: 24 }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 48, height: 48, background: '#F4E041', borderRadius: 8, border: '1px solid #ccc', margin: '0 auto'
              }} />
              <div style={{ fontSize: 14, marginTop: 8 }}>Primary<br />#F4E041</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 48, height: 48, background: '#00BDD3', borderRadius: 8, border: '1px solid #ccc', margin: '0 auto'
              }} />
              <div style={{ fontSize: 14, marginTop: 8 }}>Secondary<br />#00BDD3</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{
                width: 48, height: 48, background: '#F8F8F8', borderRadius: 8, border: '1px solid #ccc', margin: '0 auto'
              }} />
              <div style={{ fontSize: 14, marginTop: 8 }}>Background<br />#F8F8F8</div>
            </div>
          </div>
        </div>
        {/* Buttons */}
        <div style={{ marginBottom: 32 }}>
          <button className="button-yellow" style={{ marginRight: 16 }}>
            Normal
          </button>
          <button
            className="button-yellow"
            style={{ marginRight: 16 }}
            onMouseOver={e => e.currentTarget.style.background = 'var(--color-primary-hover)'}
            onMouseOut={e => e.currentTarget.style.background = 'var(--color-primary)'}
          >
            Hover
          </button>
          <button className="button-yellow" style={{ marginRight: 16 }} disabled>
            Disabled
          </button>
        </div>
        {/* Fields */}
        <div style={{ marginBottom: 32, maxWidth: 400, background: '#fff', borderRadius: 8, padding: 24, boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
          <TextField
            id="mui-helper"
            label="Helper text"
            // defaultValue="Default Value"
            helperText="Some important text"
            fullWidth
            margin="normal"
          />
          <TextField
            id="mui-error"
            label="Error"
            error
            helperText="Error text"
            fullWidth
            margin="normal"
          />
          {/* Upload field: 20% button, 80% input, stick to "Upload your photo" */}
          <div className="upload-field">
            <Button
              variant="contained"
              disableElevation
              className="upload-btn-field"
            >
              Upload
            </Button>
            <div className="upload-input-field">
              Upload your photo
            </div>
          </div>
        </div>

      </section>
      {/* Cards Example */}
      <section style={{ margin: '48px 0' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>Cards</h2>
        <div className="card-list">
          <div className="card">
            <img src={reactLogo} alt="User" style={{ width: 70, height: 70, borderRadius: '50%', marginBottom: 16, background: '#F8F8F8' }} />
            <div className="card-title">Salvador Stewart Flynn Thomas...</div>
            <div className="card-position">Frontend Developer</div>
            <div className="card-email">frontend_develop@gmail.com</div>
            <div className="card-phone">+38 (098) 278 44 24</div>
          </div>
          <div className="card">
            <img src={reactLogo} alt="User" style={{ width: 70, height: 70, borderRadius: '50%', marginBottom: 16, background: '#F8F8F8' }} />
            <div className="card-title">Takamaru Ayako Jurrien</div>
            <div className="card-position">Lead Independent Director</div>
            <div className="card-email">Takamuru@gmail.com</div>
            <div className="card-phone">+38 (098) 278 90 24</div>
          </div>
        </div>
      </section>
      {/* Images & Preloader & Tooltip & Radio buttons Example */}
      <section style={{ margin: '48px 0' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 24 }}>UI Elements</h2>
        <div style={{ display: 'flex', gap: 40, justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
          {/* Image incase */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: 15, marginBottom: 8 }}>Image</span>
            <Avatar
              src={reactLogo}
              alt="User"
              sx={{ width: 70, height: 70, bgcolor: '#F8F8F8', marginBottom: 0 }}
              variant="circular"
            />
          </div>
          {/* Preloader UI */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: 15, marginBottom: 8 }}>Preloader</span>
            <CircularProgress size={48} sx={{ color: 'var(--color-secondary)' }} />
          </div>
          {/* Tooltip */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: 15, marginBottom: 8 }}>Tooltip</span>
            <CustomTooltip title="Tooltip text">
              <span>
                Hover me
              </span>
            </CustomTooltip>
          </div>
          {/* Radio buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: 15, marginBottom: 8 }}>Radio buttons</span>
            <div>
              <CustomRadio
                name="radio-demo"
                value="checked"
                checked={radioValue === 'checked'}
                label="MaximilianMaximilian@gmail.com"
                onChange={() => setRadioValue('checked')}
              />
              <CustomRadio
                name="radio-demo"
                value="unchecked"
                checked={radioValue === 'unchecked'}
                label="MaximilianMaximilian@gmail.com"
                onChange={() => setRadioValue('unchecked')}
              />
            </div>
          </div>
        </div>
      </section>
    </ThemeProvider>
  )
}

export default App
