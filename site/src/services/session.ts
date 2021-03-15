import Cookies from "js-cookie"

export type SiteSession = {
  userId: string
  userEmail: string
  userToken: string
}

/**
 * Save session in browser cookie
 *
 * @param {SiteSession} session
 */
export const saveSession = (session: SiteSession) => {
  Cookies.set("serverless", session)
}

/**
 * Get session in browser cookie
 */
export const getSession = (): SiteSession | null => {
  const data = Cookies.get("serverless")
  return data ? JSON.parse(data) : null
}

/**
 * Delete session in browser cookie
 */
export const deleteSession = () => {
  Cookies.remove("serverless")
}
