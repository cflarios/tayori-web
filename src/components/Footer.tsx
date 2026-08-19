import { useI18n } from '../i18n'
import { Mascot } from './Mascot'
import { Link } from '../router'

export function Footer() {
  const { t } = useI18n()
  const f = t.footer

  const cls = 'text-sm text-mute-2 hover:text-white transition-colors'
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
    <footer className="mt-16 border-t border-line px-5 pb-12 pt-12 sm:mt-24 sm:px-10 sm:pb-12 sm:pt-14">
      <div className="mx-auto max-w-[1120px]">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr] md:gap-12">
          <div>
            <Link to="/" className="flex items-center gap-2.5">
              <Mascot className="h-7 w-7 shrink-0" />
              <span className="font-display text-[17px] font-bold tracking-[-0.03em]">Tayori</span>
            </Link>
            <p className="mt-4 max-w-[300px] text-sm leading-[1.6] text-mute-2">{f.tagline}</p>
            <p className="mt-3.5 max-w-[300px] text-sm leading-[1.6] text-mute-3">
              <span className="font-semibold text-mute">頼りになった</span> — {f.nameOrigin}
            </p>
            <p className="mt-3.5 text-sm text-mute-3">
              {f.madeBy}{' '}
              <a
                href="https://github.com/cflarios"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-mute hover:text-white"
              >
                @cflarios
              </a>{' '}
              · GPL-3.0
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold text-fg">{f.cols.product}</h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {f.cols.productLinks.map((l) => (
                <li key={l.t}>
                  <FootLink href={l.href}>{l.t}</FootLink>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold text-fg">{f.cols.resources}</h4>
            <ul className="mt-4 flex flex-col gap-2.5">
              {f.cols.resourceLinks.map((l) => (
                <li key={l.t}>
                  <FootLink href={l.href}>{l.t}</FootLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-11 max-w-[860px] border-t border-line pt-5.5 text-[12.5px] leading-[1.65] text-mute-3">
          {f.legal}
        </p>
      </div>
    </footer>
  )
}
