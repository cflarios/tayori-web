import { useI18n } from '../i18n'
import { Reveal } from './Reveal'

const PROVIDERS = ['Claude', 'Gemini', 'ChatGPT', 'DeepSeek', 'Ollama', 'Whisper']

export function Providers() {
  const { t } = useI18n()

  return (
    <section className="px-5 pt-13 sm:px-10">
      <Reveal className="mx-auto flex max-w-[1120px] flex-wrap items-center justify-center gap-4 sm:gap-7">
        <span className="font-mono text-xs uppercase tracking-[0.14em] text-mute-3">{t.providers.kicker}</span>
        <div className="flex flex-wrap items-center justify-center gap-2.5">
          {PROVIDERS.map((p) => (
            <span
              key={p}
              className="rounded-full border border-line-2 bg-white/[0.03] px-4 py-2 text-sm font-semibold text-[#cdcbdc] sm:px-[18px]"
            >
              {p}
            </span>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
