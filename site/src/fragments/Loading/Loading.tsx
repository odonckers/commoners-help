import React, { FunctionComponent } from "react"
import styles from "./Loading.module.css"

type LoadingProps = {
  className: string | undefined
}

export const Loading: FunctionComponent<LoadingProps> = (props) => {
  return (
    <div className={`${props.className}`}>
      <div className={`${styles.container}`}>
        <img
          draggable={false}
          alt={`Loading`}
          src={
            "https://s3.amazonaws.com/dashboard.serverless.com/images/icon-serverless-framework.png"
          }
        />

        <p>loading...</p>
      </div>
    </div>
  )
}
