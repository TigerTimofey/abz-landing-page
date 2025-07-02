import './styles/main.scss'
import Navbar from './components/Navbar/Navbar'
import WelcomeBanner from './components/WelcomeBanner/WelcomeBanner'
import UsersSection from './components/UsersSection/UsersSection'

function App() {
  return (
    <>
      <Navbar />
      <WelcomeBanner />
      <UsersSection />
      <div className="app-container">

      </div>
    </>
  )
}

export default App
