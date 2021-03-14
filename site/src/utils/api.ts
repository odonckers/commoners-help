/**
 * Utils: Back-end
 */

import { domains } from "../config"

/**
 * Register a new user
 *
 * @param {string} email
 * @param {string} password
 */
export const userRegister = async (
  email: string,
  password: string,
): Promise<any> => {
  return await requestApi("/users/register", "POST", { email, password })
}

/**
 * Login a new user
 *
 * @param {string} email
 * @param {string} password
 */
export const userLogin = async (
  email: string,
  password: string,
): Promise<any> => {
  return await requestApi("/users/login", "POST", { email, password })
}

/**
 * userGet
 *
 * @param {string} token
 */
export const userGet = async (token: string): Promise<any> => {
  return await requestApi("/user", "POST", null, {
    Authorization: `Bearer ${token}`,
  })
}

/**
 * API request to call the backend
 *
 * @param {string} path
 * @param {"GET" | "POST"}
 * @param {*} data
 * @param {{ [x: string]: * }} headers
 */
export const requestApi = async (
  path: string = "",
  method: "GET" | "POST" = "GET",
  data: any = null,
  headers: { [x: string]: any } = {},
): Promise<any> => {
  // Check if API URL has been set
  const apiUrl = domains?.api
  if (!apiUrl) {
    throw new Error(
      `Error: Missing API Domain – Please add the API domain from your serverless Express.js back-end to this front-end application.  You can do this in the "site" folder, in the "./config.js" file.  Instructions are listed there and in the documentation.`,
    )
  }

  // Prepare URL
  if (!path.startsWith("/")) {
    path = `/${path}`
  }
  const url = `${apiUrl}${path}`

  // Set headers
  headers = Object.assign({ "Content-Type": "application/json" }, headers)

  // Default options are marked with *
  const response = await fetch(url, {
    method: method.toUpperCase(),
    mode: "cors",
    cache: "no-cache",
    headers,
    body: data ? JSON.stringify(data) : null,
  })

  if (response.status < 200 || response.status >= 300) {
    const error = await response.json()
    throw new Error(error.error)
  }

  return await response.json()
}
