export const ADMIN_EMAILS = [
  'klausqterra@gmail.com',
  'wanieleterra@gmail.com',
]

export function normalizeEmail(email) {
  return (email || '').trim().toLowerCase()
}

export function isAdminEmail(email) {
  return ADMIN_EMAILS.includes(normalizeEmail(email))
}
