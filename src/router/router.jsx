// React Router
import { createBrowserRouter } from 'react-router-dom'
// Components
import { App } from '../app'
import { Home } from '../home/home'
import { Settings } from '../components/settings/settings'
import { RouteError } from '../components/routeError/routeError'
import { SignIn } from '../components/signIn/signIn'
import { Calendar } from '../components/calendar/calendar'

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
            element: <Calendar />,
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
