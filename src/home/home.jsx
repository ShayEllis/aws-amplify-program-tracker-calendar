// Styles
import './home.css'
// React Router
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  const handleSignIn = () => {
    navigate('/main')
  }

  return (
    <>
      <h1>Fantasy Football League Tracker</h1>
      <button size='lg' onClick={handleSignIn}>
        Sign in
      </button>
    </>
  )
}

export { Home }
