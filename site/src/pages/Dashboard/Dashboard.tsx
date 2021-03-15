import React, { FunctionComponent, useEffect, useState } from "react"
import { withRouter } from "react-router-dom"
import {
  fetchSession,
  deleteSession,
  SiteSession,
} from "../../services/session"
import styles from "./Dashboard.module.css"

type DashboardProps = {
  history: any
}

const Dashboard: FunctionComponent<DashboardProps> = (props) => {
  const [session, setSession] = useState<SiteSession | null>()

  useEffect(() => {
    const userSession = fetchSession()
    setSession(userSession)
  }, [])

  /**
   * Log user out by clearing cookie and redirecting
   */
  const logout = () => {
    deleteSession()
    props.history.push(`/`)
  }

  return (
    <div className={`${styles.container} animateFadeIn`}>
      <div className={styles.containerInner}>
        {/* Navigation */}

        <div className={styles.navigationContainer}>
          <div className={`link`}>{session ? session.userEmail : ""}</div>
          <div className={`link`} onClick={logout}>
            logout
          </div>
        </div>

        {/* Content */}

        <div className={`${styles.contentContainer}`}>
          <div className={`${styles.artwork} animateFlicker`}>
            <img
              draggable="false"
              src={"./fullstack-app-artwork.png"}
              alt="serverless-fullstack-application"
            />
          </div>

          <div className={`${styles.welcomeMessage}`}>
            Welcome to your serverless fullstack dashboard...
          </div>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Dashboard)
