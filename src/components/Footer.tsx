import { useI18n } from '../i18n'
import { Mascot } from './Mascot'
import { Link } from '../router'

export function Footer() {
  const { t } = useI18n()
  const f = t.footer

  const cls = 'text-sm text-[var(--color-mute)] hover:text-white transition-colors'
  const FootLink = ({ href, children }: { href: string; children: string }) =>
    href.startsWith('http') ? (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    ) : (
      <Link to={href} className={cls}>
        {children}
      </Link>
    )

  return (
    <footer className="hairline pt-16 pb-10">
      <div className="mx-auto max-w-6xl px-5">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link to="/" className="flex items-center gap-2 font-bold tracking-tight">
              <Mascot className="h-8 w-8 shrink-0" />
              <span className="text-[17px]">Tayori</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--color-mute)]">{f.tagline}</p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--color-mute-2)]">
              <span className="font-medium text-[#dcdbe8]">頼りになった</span> — {f.nameOrigin}
            </p>
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
              · GPL-3.0
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">{f.cols.product}</h4>
            <ul className="mt-4 space-y-2.5">
              {f.cols.productLinks.map((l) => (
                <li key={l.t}>
                  <FootLink href={l.href}>{l.t}</FootLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">{f.cols.resources}</h4>
            <ul className="mt-4 space-y-2.5">
              {f.cols.resourceLinks.map((l) => (
                <li key={l.t}>
                  <FootLink href={l.href}>{l.t}</FootLink>
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
