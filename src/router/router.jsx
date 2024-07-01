// React Router
import { createBrowserRouter } from 'react-router-dom'
// Components
import { App } from '../app'
import { Home } from '../home/home'
import { Main } from '../components/main/main'
import { Settings } from '../components/settings/settings'
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
        element: <App />,
        children: [
          {
            index: true,
            element: <Main />,
          },
          {
            path: 'settings',
            element: <Settings />,
          },
        ],
      },
    ],
  },
])

export { router }
