/**
 * API Service: Users
 */

import { requestApi } from "./request-api"

/**
 * Register a new user
 *
 * @param {string} email
 * @param {string} password
 */
export const register = async (
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
export const login = async (email: string, password: string): Promise<any> => {
  return await requestApi("/users/login", "POST", { email, password })
}

/**
 * Fetch a logged in user
 *
 * @param {string} token
 */
export const fetch = async (token: string): Promise<any> => {
  return await requestApi("/user", "POST", null, {
    Authorization: `Bearer ${token}`,
  })
}

export default { register, login, fetch }
