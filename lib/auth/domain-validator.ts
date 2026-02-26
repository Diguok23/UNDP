/**
 * Domain validation for admin authentication
 * Only @alghahim.co.ke and @unedp.org emails are allowed
 */

const ALLOWED_DOMAINS = ['alghahim.co.ke', 'unedp.org']

/**
 * Checks if an email belongs to an allowed domain
 * @param email - The email address to validate
 * @returns true if email domain is allowed, false otherwise
 */
export function isAllowedDomain(email: string): boolean {
  if (!email || typeof email !== 'string') {
    return false
  }

  const emailLower = email.toLowerCase().trim()
  const parts = emailLower.split('@')

  if (parts.length !== 2) {
    return false
  }

  const domain = parts[1]
  return ALLOWED_DOMAINS.includes(domain)
}

/**
 * Gets a generic error message that doesn't reveal allowed domains
 */
export function getGenericDomainError(): string {
  return 'Email not recognized in system. Please use your work email address.'
}
