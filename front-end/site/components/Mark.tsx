// The WQuicks mark: prairie sky over a canola field, with the sun on the horizon.
export function Mark({ size = 28 }: { size?: number }) {
  return (
    <svg className="mark" width={size} height={size} viewBox="0 0 28 28" aria-hidden="true">
      <rect width="28" height="28" rx="6" fill="var(--sky)" />
      <circle cx="18.5" cy="18" r="5.5" fill="var(--sun)" />
      <path d="M0 18h28v4a6 6 0 0 1-6 6H6a6 6 0 0 1-6-6z" fill="var(--canola)" />
    </svg>
  )
}

export function Wordmark() {
  return (
    <span className="wordmark">
      <Mark />
      <span>WQuicks</span>
    </span>
  )
}
