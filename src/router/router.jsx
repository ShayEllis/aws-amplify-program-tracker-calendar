// React Router
import { createBrowserRouter } from 'react-router-dom'
// Components
import { App } from '../root'
import { Home } from '../home/home'
import { Calendar } from '../components/calendar/calendar'
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
