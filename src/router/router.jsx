// React Router
import { createBrowserRouter } from 'react-router-dom'
// Components
import { App } from '../app'
import { RouteError } from '../components/routeError/routeError'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <RouteError />,
  },
])

export { router }
