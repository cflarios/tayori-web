import { useState } from 'react'
import { useI18n } from '../i18n'
import { Icon } from '../icons'
import { Reveal } from './Reveal'

/** One participant tile in the mock call. */
function Participant({ name, initial, accent }: { name: string; initial: string; accent?: boolean }) {
  return (
    <div className="relative grid aspect-[4/3] place-items-center rounded-[9px] border border-line bg-gradient-to-br from-white/5 to-white/[0.015] sm:rounded-[10px]">
      <div
        className={`grid h-[38px] w-[38px] place-items-center rounded-full text-sm font-bold sm:h-[46px] sm:w-[46px] sm:text-base ${
          accent ? 'bg-gradient-to-br from-violet to-[#22d3ee] text-white' : 'bg-white/10 text-white/70'
        }`}
      >
        {initial}
      </div>
      <span className="absolute bottom-1.5 left-2 text-xs font-medium text-white/75 sm:bottom-2 sm:left-2.5">{name}</span>
    </div>
  )
}

/** The green "you are sharing" strip that sits at the top of a screen. */
function ShareBanner({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-[rgba(52,211,153,0.1)] px-2.5 py-[7px] text-xs font-semibold text-mint shadow-[inset_0_0_0_1px_rgba(52,211,153,0.15)]">
      <Icon.monitor className="h-[13px] w-[13px] shrink-0 sm:h-3.5 sm:w-3.5" strokeWidth={1.7} />
      {label}
    </div>
  )
}

/** The Tayori overlay, floating over the call — only ever on "your screen". */
function Overlay() {
  const { t } = useI18n()
  const d = t.demo

  return (
    <div className="absolute left-1/2 top-[50px] w-[88%] -translate-x-1/2 rounded-[11px] border border-white/10 bg-[rgba(20,20,30,0.95)] p-[11px] shadow-[0_20px_46px_-16px_rgba(0,0,0,0.9)] sm:top-[58px] sm:w-[82%] sm:rounded-xl sm:p-3 sm:backdrop-blur-[10px]">
      <div className="mb-2 flex items-center justify-between">
        <span className="flex items-center gap-1.5 text-xs font-bold text-mint">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-green" />
          {d.listening}
        </span>
        <span className="font-mono text-[10.5px] tracking-[0.1em] text-mute-3">2 / 5</span>
      </div>

      <p className="text-xs leading-[1.45] text-mute">
        <span className="mr-1.5 rounded bg-[rgba(34,211,238,0.14)] px-1 py-px font-mono text-[10.5px] text-cyan">
          {d.other.toUpperCase()}
        </span>
        {d.question}
      </p>

      <div className="mb-1.5 mt-2.5 font-mono text-[10.5px] uppercase tracking-[0.14em] text-violet-2 sm:mt-3">
        {d.suggested}
      </div>

      <ul className="flex flex-col gap-[5px]">
        {d.bullets.map((b, i) => (
          <li
            key={b}
            className={`gap-[7px] text-xs leading-[1.4] text-fg-2 ${i === 2 ? 'hidden sm:flex' : 'flex'}`}
          >
            <span className="mt-[5px] h-[3px] w-[3px] shrink-0 rounded-full bg-violet-2" />
            {b}
          </li>
        ))}
      </ul>
    </div>
  )
}

export function ShareDemo() {
  const { t } = useI18n()
  const d = t.demo
  const [sharing, setSharing] = useState(true)

  return (
    <section id="demo" className="px-5 pt-9 sm:px-10 sm:pt-13">
      <Reveal className="mx-auto max-w-[1120px]">
        <div className="rounded-[20px] border border-line-2 bg-panel p-4 sm:rounded-3xl sm:p-6">
          {/* Controls */}
          <div className="flex items-center justify-between gap-5 pb-4 sm:px-2 sm:pb-5 sm:pt-1">
            <div className="flex items-center gap-3 sm:gap-3.5">
              <button
                role="switch"
                aria-checked={sharing}
                aria-label={d.toggle}
                onClick={() => setSharing((v) => !v)}
                className={`relative h-[30px] w-[54px] shrink-0 cursor-pointer rounded-full transition-colors duration-300 ${
                  sharing ? 'bg-violet' : 'bg-white/[0.13]'
                }`}
              >
                <span
                  className={`absolute top-[3px] h-6 w-6 rounded-full bg-white transition-[left] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                    sharing ? 'left-[27px]' : 'left-[3px]'
                  }`}
                />
              </button>
              <div className="text-left">
                <div className="text-[14.5px] font-bold text-fg sm:text-[15px]">{d.toggle}</div>
                <div className="text-[12.5px] leading-[1.4] text-mute-2 sm:text-[13px]">
                  {sharing ? d.hintOn : d.hintOff}
                </div>
              </div>
            </div>
            <span className="hidden font-mono text-xs uppercase tracking-[0.1em] text-mute-3 lg:inline">
              {d.liveTag}
            </span>
          </div>

          <div className="grid gap-4 lg:grid-cols-2 lg:gap-5">
            {/* Your screen */}
            <div className="rounded-[14px] border border-[rgba(139,92,246,0.3)] bg-well p-3 sm:rounded-2xl sm:p-4">
              <div className="mb-2.5 flex items-center justify-between sm:mb-3.5">
                <span className="flex items-center gap-2 text-[13px] font-bold text-fg sm:text-[13.5px]">
                  <Icon.monitor className="h-[15px] w-[15px] text-violet-2 sm:h-4 sm:w-4" strokeWidth={1.7} />
                  {d.yours}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-mute-3">{d.yoursTag}</span>
              </div>

              <div className="relative min-h-[232px] rounded-[11px] bg-screen p-[11px] sm:min-h-[268px] sm:rounded-xl sm:p-3.5">
                <ShareBanner label={sharing ? d.bannerOn : d.bannerOff} />
                <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:mt-3 sm:gap-3">
                  <Participant name={d.other} initial={d.other.charAt(0)} accent />
                  <Participant name={d.you} initial={d.you.charAt(0)} />
                </div>
                <Overlay />
              </div>
            </div>

            {/* Their screen */}
            <div className="rounded-[14px] border border-line-2 bg-well p-3 sm:rounded-2xl sm:p-4">
              <div className="mb-2.5 flex items-center justify-between sm:mb-3.5">
                <span className="flex items-center gap-2 text-[13px] font-bold text-fg sm:text-[13.5px]">
                  <Icon.globe className="h-[15px] w-[15px] text-cyan sm:h-4 sm:w-4" strokeWidth={1.7} />
                  {d.theirs}
                </span>
                <span className="font-mono text-xs uppercase tracking-[0.08em] text-mute-3">
                  {sharing ? d.theirsTagOn : d.theirsTagOff}
                </span>
              </div>

              <div className="relative min-h-[232px] rounded-[11px] bg-screen p-[11px] sm:min-h-[268px] sm:rounded-xl sm:p-3.5">
                {sharing ? (
                  <>
                    <ShareBanner label={d.theirBanner} />
                    <div className="mt-2.5 grid grid-cols-2 gap-2.5 sm:mt-3 sm:gap-3">
                      <Participant name={d.other} initial={d.other.charAt(0)} accent />
                      <Participant name={d.you} initial={d.you.charAt(0)} />
                    </div>
                    {/* w-max keeps the pill on one line: an absolutely positioned
                        box at left-1/2 otherwise shrink-to-fits into half the
                        pane, which wraps the longer Spanish string. */}
                    <div className="absolute bottom-4 left-1/2 flex w-max max-w-[92%] -translate-x-1/2 items-center gap-2 rounded-full border border-line-2 bg-[rgba(11,11,17,0.85)] px-3.5 py-[7px] text-center text-xs font-semibold text-mute">
                      <Icon.eyeOff className="h-[13px] w-[13px] shrink-0 text-cyan" strokeWidth={1.7} />
                      {d.noOverlay}
                    </div>
                  </>
                ) : (
                  <div className="grid min-h-[210px] place-items-center text-center sm:min-h-[240px]">
                    <div>
                      <Icon.monitor className="mx-auto h-[26px] w-[26px] text-[#3f3d52]" strokeWidth={1.5} />
                      <p className="mt-3 text-[13px] leading-[1.5] text-mute-3">
                        {d.idle[0]}
                        <br />
                        {d.idle[1]}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
