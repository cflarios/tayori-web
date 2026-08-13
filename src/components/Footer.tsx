import { useI18n } from '../i18n'
import { Icon } from '../icons'

export function Footer() {
  const { t } = useI18n()
  const f = t.footer

  const external = (href: string) => href.startsWith('http')

  return (
    <footer className="hairline pt-16 pb-10">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <a href="#top" className="flex items-center gap-2 font-bold tracking-tight">
              <Icon.logo className="h-6 w-6" />
              <span className="text-[17px]">Tayori</span>
            </a>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--color-mute)]">{f.tagline}</p>
            <p className="mt-4 text-sm text-[var(--color-mute-2)]">
              {f.madeBy}{' '}
              <a
                href="https://github.com/cflarios"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-[#dcdbe8] hover:text-white"
              >
                @cflarios
              </a>{' '}
              · MIT
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">{f.cols.product}</h4>
            <ul className="mt-4 space-y-2.5">
              {f.cols.productLinks.map((l) => (
                <li key={l.t}>
                  <a href={l.href} className="text-sm text-[var(--color-mute)] hover:text-white transition-colors">
                    {l.t}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">{f.cols.resources}</h4>
            <ul className="mt-4 space-y-2.5">
              {f.cols.resourceLinks.map((l) => (
                <li key={l.t}>
                  <a
                    href={l.href}
                    {...(external(l.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="text-sm text-[var(--color-mute)] hover:text-white transition-colors"
                  >
                    {l.t}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-[var(--color-line)] pt-6">
          <p className="max-w-3xl text-xs leading-relaxed text-[var(--color-mute-2)]">{f.legal}</p>
        </div>
      </div>
    </footer>
  )
}
