import React, { FunctionComponent, useState, useEffect } from "react"
import { Link, withRouter } from "react-router-dom"
import { Loading } from "../../components"
import { users } from "../../services/api"
import { saveSession } from "../../services/session"
import styles from "./Auth.module.css"

type AuthProps = {
  history: any
}

const Auth: FunctionComponent<AuthProps> = (props) => {
  const pathName = window.location.pathname.replace("/", "")

  const [state, setState] = useState(pathName)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [formEmail, setFormEmail] = useState("")
  const [formPassword, setFormPassword] = useState("")

  useEffect(() => {
    setLoading(false)

    const url = document.location.href
    window.history.pushState({}, "", url.split("?")[0])
  }, [])

  /**
   * Handles a form change
   */
  const handleFormTypeChange = (type: string) => {
    setState(type)
    props.history.push(`/${type}`)
  }

  /**
   * Handles form submission
   */
  const handleFormSubmit = async (evt: any) => {
    evt.preventDefault()

    setLoading(true)

    // Validate email
    if (!formEmail) {
      setLoading(false)
      setError("email is required")
      return
    }

    // Validate password
    if (!formPassword) {
      setLoading(false)
      setError("password is required")
      return
    }

    let token
    try {
      if (state === "register") {
        token = await users.register(formEmail, formPassword)
      } else {
        token = await users.login(formEmail, formPassword)
      }
    } catch (error) {
      console.log(error)

      if (error.message) {
        setError(error.message)
        setLoading(false)
      } else {
        setError("Sorry, something unknown went wrong. Please try again.")
        setLoading(false)
      }
      return
    }

    // Fetch user record and set session in cookie
    let user = await users.fetch(token.token)
    user = user.user
    saveSession({
      userId: user.id,
      userEmail: user.email,
      userToken: token.token,
    })

    window.location.replace("/")
  }

  return (
    <div className={`${styles.container} animateFadeIn`}>
      <div className={styles.containerInner}>
        {/* Logo */}

        <Link to="/" className={`${styles.logo}`}>
          <img
            draggable="false"
            src={"./fullstack-app-title.png"}
            alt="serverless-fullstack-application"
          />
        </Link>

        {/* Loading */}

        {loading && (
          <div>{<Loading className={styles.containerLoading} />}</div>
        )}

        {/* Registration Form */}

        {!loading && (
          <div className={styles.formType}>
            <div
              className={`${styles.formTypeRegister}
              ${state === "register" ? styles.formTypeActive : ""}`}
              onClick={(e) => handleFormTypeChange("register")}
            >
              Register
            </div>

            <div
              className={`${styles.formTypeSignIn}
              ${state === "login" ? styles.formTypeActive : ""}`}
              onClick={(e) => handleFormTypeChange("login")}
            >
              Sign-In
            </div>
          </div>
        )}

        {state === "register" && !loading && (
          <div className={styles.containerRegister}>
            <form className={styles.form} onSubmit={handleFormSubmit}>
              <div className={styles.formField}>
                <label className={styles.formLabel}>email</label>
                <input
                  type="text"
                  placeholder="yours@example.com"
                  className={styles.formInput}
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                />
              </div>
              <div className={styles.formField}>
                <label className={styles.formLabel}>password</label>
                <input
                  type="password"
                  placeholder="your password"
                  className={styles.formInput}
                  value={formPassword}
                  onChange={(e) => setFormPassword(e.target.value)}
                />
              </div>

              {error && <div className={styles.formError}>{error}</div>}

              <input
                className={`buttonPrimaryLarge ${styles.formButton}`}
                type="submit"
                value="Register"
              />
            </form>
          </div>
        )}

        {state === "login" && !loading && (
          <div className={styles.containerSignIn}>
            <form className={styles.form} onSubmit={handleFormSubmit}>
              <div className={styles.formField}>
                <label className={styles.formLabel}>email</label>
                <input
                  type="text"
                  placeholder="yours@example.com"
                  className={styles.formInput}
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                />
              </div>
              <div className={styles.formField}>
                <label className={styles.formLabel}>password</label>
                <input
                  type="password"
                  placeholder="your password"
                  className={styles.formInput}
                  value={formPassword}
                  onChange={(e) => setFormPassword(e.target.value)}
                />
              </div>

              {error && <div className={styles.formError}>{error}</div>}

              <input
                className={`buttonPrimaryLarge ${styles.formButton}`}
                type="submit"
                value="Sign In"
              />
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default withRouter(Auth)
