// React Router
import { createBrowserRouter } from 'react-router-dom'
// Components
import { App } from '../app'
import { Home } from '../home/home'
import { RouteError } from '../components/routeError/routeError'
import { SignIn } from '../components/signIn/signIn'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <RouteError />,
  },
  {
    element: <SignIn />,
    children: [
      {
        path: '/main',
        element: <App />
      }
    ]
  },
])

export { router }
