import React, { ComponentType } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import { Auth, Dashboard, Home } from "./pages"
import { getSession } from "./utils"

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/register">
          <Auth />
        </Route>

        <Route path="/login">
          <Auth />
        </Route>

        <PrivateRoute exact path="/" component={Dashboard} />
      </Switch>
    </Router>
  )
}

/**
 * A component to protect routes.
 * Shows Auth page if the user is not authenticated
 */
const PrivateRoute = ({
  component,
  ...options
}: {
  component: ComponentType
  [x: string]: any
}) => {
  const session = getSession()
  const finalComponent = session ? Dashboard : Home

  return <Route {...options} component={finalComponent} />
}

export default App
