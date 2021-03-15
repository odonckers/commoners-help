import React, { FunctionComponent } from "react"
import { Link, withRouter } from "react-router-dom"
import styles from "./Home.module.css"

type HomeProps = {}

const Home: FunctionComponent<HomeProps> = (props) => {
  return (
    <div className={`${styles.container} animateFadeIn`}>
      <div className={styles.containerInner}>
        {/* Hero Artwork */}

        <div className={`${styles.heroArtwork} animateFlicker`}>
          <img
            draggable="false"
            src={"./fullstack-app-artwork.png"}
            alt="serverless-fullstack-application"
          />
        </div>
        <div className={`${styles.heroTitle}`}>
          <img
            draggable="false"
            src={"./fullstack-app-title.png"}
            alt="serverless-fullstack-application"
          />
        </div>

        {/* Hero Description */}

        <div className={`${styles.heroDescription}`}>
          A serverless full-stack application built with AWS Lambda, AWS HTTP
          API, Express.js, React & AWS DynamoDB.
        </div>

        {/* Call To Action */}

        <div className={`${styles.containerCta}`}>
          <Link to="/register">
            <button className={`buttonPrimaryLarge`}>Register</button>
          </Link>

          <Link to="/login" className={`${styles.linkSignIn}`}>
            sign-in
          </Link>
        </div>
      </div>
    </div>
  )
}

export default withRouter(Home)
