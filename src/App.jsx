import './styles/main.scss'
import Navbar from './components/Navbar/Navbar'
import WelcomeBanner from './components/WelcomeBanner/WelcomeBanner'
import UsersSection from './components/UsersSection/UsersSection'
import SignUpSection from './components/SignUpSection/SignUpSection'

function App() {
  return (
    <>
      <Navbar />
      <WelcomeBanner />
      <UsersSection />
      <SignUpSection />
      <div className="app-container">

      </div>
    </>
  )
}

export default App
