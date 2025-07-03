import './styles/main.scss'
import Navbar from './components/Navbar/Navbar'
import WelcomeBanner from './components/WelcomeBanner/WelcomeBanner'
import UsersSection from './components/UsersSection/UsersSection'
import SignUpSection from './components/SignUpSection/SignUpSection'
import { useState } from 'react'

function App() {
  const [reloadKey, setReloadKey] = useState(0)
  const handleRegistrationSuccess = () => setReloadKey(k => k + 1)

  return (
    <>
      <Navbar />
      <WelcomeBanner />
      <UsersSection reloadKey={reloadKey} />
      <SignUpSection onSuccess={handleRegistrationSuccess} />
    </>
  )
}

export default App
