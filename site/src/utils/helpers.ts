import Cookies from "js-cookie"

/**
 * Format Org and Username correctly for the Serverless Platform backend
 *
 * @param {string} name
 */
export const formatOrgAndUsername = (name: string = ""): string => {
  name = name
    .toString()
    .toLowerCase()
    .replace(/[^a-z\d-]+/gi, "-")

  // Remove multiple instances of hyphens
  name = name.replace(/-{2,}/g, "-")
  if (name.length > 40) {
    name = name.substring(0, 40)
  }

  return name
}

/**
 * Parse query parameters in a URL
 *
 * @param {string | null} searchString
 */
export const parseQueryParams = (
  searchString: string | null = null,
): { [x: string]: any } | null => {
  if (!searchString) return null

  // Clone string
  let clonedParams = (" " + searchString).slice(1)

  return clonedParams
    .substr(1)
    .split("&")
    .filter((el) => el.length)
    .map((el) => el.split("="))
    .reduce((accumulator, currentValue) => {
      const key = currentValue.shift()
      const value = currentValue.pop()
      if (!key || !value) return ""

      return Object.assign(accumulator, {
        [decodeURIComponent(key)]: decodeURIComponent(value),
      })
    }, {})
}

/**
 * Parse hash fragment parameters in a URL
 *
 * @param {string} hashString
 */
export const parseHashFragment = (
  hashString: string,
): { [x: string]: string } => {
  const hashData: { [x: string]: string } = {}
  const hash = decodeURI(hashString)
  const values = hash.split("&")

  values.forEach((val) => {
    val = val.replace("#", "")
    hashData[val.split("=")[0]] = val.split("=")[1]
  })

  return hashData
}

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
