import { useEffect, useState } from 'react'

/** Best-effort fetch of the latest release tag, for a live version badge. */
export function useLatestRelease() {
  const [tag, setTag] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    fetch('https://api.github.com/repos/cflarios/Tayori/releases/latest', {
      headers: { Accept: 'application/vnd.github+json' },
    })
      .then((r) => (r.ok ? r.json() : null))
      .then((d: { tag_name?: string } | null) => {
        if (alive && d?.tag_name) setTag(d.tag_name)
      })
      .catch(() => {})
    return () => {
      alive = false
    }
  }, [])

  return tag
}
