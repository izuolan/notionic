/**
 * Retries an async function up to `maxRetries` times when it encounters a
 * Notion API 429 (Too Many Requests) response.  Other errors are re-thrown
 * immediately without retrying.
 *
 * @param {() => Promise<any>} fn - The async function to call.
 * @param {number} [maxRetries=5] - Maximum number of retry attempts.
 * @param {number} [baseDelayMs=1000] - Starting delay in milliseconds (doubles each attempt).
 * @returns {Promise<any>}
 */
export async function retryWithBackoff(fn, maxRetries = 5, baseDelayMs = 1000) {
  let attempt = 0

  while (true) {
    try {
      return await fn()
    } catch (error) {
      const statusCode =
        error?.status ||
        error?.statusCode ||
        error?.response?.status ||
        error?.response?.statusCode

      if (statusCode === 429 && attempt < maxRetries) {
        attempt++
        const delaySeconds = (baseDelayMs * Math.pow(2, attempt - 1)) / 1000
        console.log(`[notion] 429, retrying in ${delaySeconds}s... (attempt ${attempt}/${maxRetries})`)
        await new Promise((resolve) =>
          setTimeout(resolve, baseDelayMs * Math.pow(2, attempt - 1))
        )
      } else if (statusCode === 429) {
        const exhaustedError = new Error(
          `[notion] 429 Too Many Requests — all ${maxRetries} retries exhausted`
        )
        exhaustedError.cause = error
        throw exhaustedError
      } else {
        throw error
      }
    }
  }
}
