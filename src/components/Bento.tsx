import { useState, type ReactNode } from 'react'
import { useI18n } from '../i18n'
import { Icon } from '../icons'
import { Reveal } from './Reveal'

/** A small bento tile: icon, heading, one paragraph. Spans 2 of 6 columns. */
function SmallTile({
  icon,
  title,
  body,
  delay,
}: {
  icon: ReactNode
  title: string
  body: string
  delay: number
}) {
  return (
    <Reveal as="div" delay={delay} className="lg:col-span-2">
      <div className="tile tile-hover h-full p-5 sm:p-6.5">
        {icon}
        <h3 className="mt-4 font-display text-[19px] font-semibold tracking-[-0.02em]">{title}</h3>
        <p className="mt-2 text-sm leading-[1.6] text-mute">{body}</p>
      </div>
    </Reveal>
  )
}

/** Header line of a wide tile: icon plus a mono label. */
function WideHead({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2.5">
      {icon}
      <span className="font-mono text-xs uppercase tracking-[0.12em] text-mute-3">{label}</span>
    </div>
  )
}

/** The two-sum snippet the vision model would hand back. */
function CodeSample({ comment }: { comment: string }) {
  const kw = 'text-violet-3'
  return (
    <div className="mt-5 hidden rounded-xl border border-line bg-well p-4 font-mono text-[12.5px] leading-[1.75] sm:block">
      <div className="text-mute-3">{comment}</div>
      <div>
        <span className={kw}>def</span> <span className="text-cyan">two_sum</span>(nums, target):
      </div>
      <div className="pl-4">seen = {'{}'}</div>
      <div className="pl-4">
        <span className={kw}>for</span> i, n <span className={kw}>in</span> enumerate(nums):
      </div>
      <div className="pl-8">
        <span className={kw}>if</span> target - n <span className={kw}>in</span> seen:
      </div>
      <div className="pl-12">
        <span className={kw}>return</span> [seen[target - n], i]
      </div>
      <div className="pl-8">seen[n] = i</div>
    </div>
  )
}

/** Cloud vs fully-local, as a spec sheet that swaps on a pill. */
function StackTile() {
  const { t } = useI18n()
  const s = t.bento.stack
  const [local, setLocal] = useState(false)

  const rows = local
    ? [
        { k: s.rowTranscription, v: s.localTranscription },
        { k: s.rowAnswers, v: s.localAnswers },
        { k: s.rowKeys, v: s.localKeys },
      ]
    : [
        { k: s.rowTranscription, v: s.cloudTranscription },
        { k: s.rowAnswers, v: s.cloudAnswers },
        { k: s.rowKeys, v: s.cloudKeys },
      ]

  const pill = (on: boolean) =>
    `cursor-pointer rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors ${
      on
        ? 'border-[rgba(139,92,246,0.5)] bg-[rgba(139,92,246,0.16)] text-[#ddd6fe]'
        : 'border-line-2 bg-transparent text-mute-2 hover:border-white/25 hover:text-fg'
    }`

  return (
    <div className="tile tile-hover h-full p-5 sm:p-6.5">
      <WideHead
        icon={<Icon.shield className="h-[22px] w-[22px] text-mint" />}
        label={s.kbd}
      />
      <h3 className="mt-4 font-display text-[20px] font-semibold tracking-[-0.02em] sm:text-[22px]">{s.t}</h3>
      <p className="mt-2 max-w-[420px] text-sm leading-[1.6] text-mute">{s.d}</p>

      <div className="mt-5 flex gap-2" role="group">
        <button onClick={() => setLocal(false)} aria-pressed={!local} className={pill(!local)}>
          {s.cloud}
        </button>
        <button onClick={() => setLocal(true)} aria-pressed={local} className={pill(local)}>
          {s.local}
        </button>
      </div>

      <div className="mt-4 rounded-xl border border-line bg-well p-4 sm:p-4.5">
        <div className="flex flex-col gap-3">
          {rows.map((r) => (
            <div key={r.k} className="flex items-baseline justify-between gap-4">
              <span className="font-mono text-xs uppercase tracking-[0.08em] text-mute-3">{r.k}</span>
              <span className="text-right text-sm font-semibold text-fg">{r.v}</span>
            </div>
          ))}
          <div className="flex items-baseline justify-between gap-4 border-t border-line pt-3">
            <span className="font-mono text-xs uppercase tracking-[0.08em] text-mute-3">{s.leavesLabel}</span>
            <span className={`text-right text-sm font-bold ${local ? 'text-mint' : 'text-fg'}`}>
              {local ? s.leavesLocal : s.leavesCloud}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Bento() {
  const { t } = useI18n()
  const s = t.bento

  return (
    <section id="product" className="px-5 pt-16 sm:px-10 sm:pt-24">
      <div className="mx-auto max-w-[1120px]">
        <Reveal className="max-w-[640px]">
          <span className="font-mono text-xs uppercase tracking-[0.14em] text-violet-2">{s.kicker}</span>
          <h2 className="mt-4 font-display text-[30px] font-bold leading-[1.1] tracking-[-0.03em] text-pretty sm:mt-4.5 sm:text-[40px]">
            {s.title}
          </h2>
          <p className="mt-4 text-base leading-[1.6] text-mute sm:text-[17px]">{s.sub}</p>
        </Reveal>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 sm:mt-10 lg:grid-cols-6">
          <SmallTile
            delay={0}
            icon={<Icon.ears className="h-[22px] w-[22px] text-violet-2" />}
            title={s.ears.t}
            body={s.ears.d}
          />
          <SmallTile
            delay={80}
            icon={<Icon.wave className="h-[22px] w-[22px] text-cyan" />}
            title={s.transcribe.t}
            body={s.transcribe.d}
          />
          <SmallTile
            delay={160}
            icon={<Icon.lines className="h-[22px] w-[22px] text-[#f0abfc]" />}
            title={s.teleprompter.t}
            body={s.teleprompter.d}
          />

          <Reveal as="div" className="sm:col-span-2 lg:col-span-3">
            <div className="tile tile-hover h-full p-5 sm:p-6.5">
              <WideHead icon={<Icon.code className="h-[22px] w-[22px] text-violet-2" />} label={s.solve.kbd} />
              <h3 className="mt-4 font-display text-[20px] font-semibold tracking-[-0.02em] sm:text-[22px]">
                {s.solve.t}
              </h3>
              <p className="mt-2 max-w-[420px] text-sm leading-[1.6] text-mute">{s.solve.d}</p>
              <CodeSample comment={s.solve.comment} />
            </div>
          </Reveal>

          <Reveal as="div" delay={80} className="sm:col-span-2 lg:col-span-3">
            <StackTile />
          </Reveal>

          <SmallTile
            delay={0}
            icon={<Icon.phone className="h-[22px] w-[22px] text-cyan" />}
            title={s.phone.t}
            body={s.phone.d}
          />
          <SmallTile
            delay={80}
            icon={<Icon.globe className="h-[22px] w-[22px] text-violet-2" />}
            title={s.interpreter.t}
            body={s.interpreter.d}
          />
          <SmallTile
            delay={160}
            icon={<Icon.volume className="h-[22px] w-[22px] text-mint" />}
            title={s.speech.t}
            body={s.speech.d}
          />
        </div>
      </div>
    </section>
  )
}
