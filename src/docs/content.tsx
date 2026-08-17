import { isValidElement, type ReactNode } from 'react'
import type { Lang } from '../i18n'

/* ---------------------------------------------------------------- primitives */

export function Kbd({ children }: { children: ReactNode }) {
  return <kbd>{children}</kbd>
}

export function Callout({ tone = 'info', children }: { tone?: 'info' | 'tip' | 'warn'; children: ReactNode }) {
  const map = {
    info: 'border-violet-400/30 bg-violet-500/8 text-violet-100',
    tip: 'border-cyan-400/30 bg-cyan-500/8 text-cyan-50',
    warn: 'border-amber-400/30 bg-amber-500/8 text-amber-50',
  } as const
  const icon = { info: 'ℹ', tip: '✦', warn: '⚠' } as const
  return (
    <div className={`not-prose flex gap-3 rounded-xl border p-4 text-[14px] leading-relaxed ${map[tone]}`}>
      <span className="select-none pt-0.5 opacity-80">{icon[tone]}</span>
      <div className="[&_strong]:text-white">{children}</div>
    </div>
  )
}

export function DocTable({ head, rows }: { head: ReactNode[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto">
      <table>
        <thead>
          <tr>{head.map((h, i) => <th key={i}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/* --------------------------------------------------------------------- model */

type Bi = { en: string; es: string }
export type DocGroup = { id: string; label: Bi }
export type DocSection = { id: string; group: string; title: Bi; body: (lang: Lang) => ReactNode }

/** Walk a section's element tree and pull out its plain text, for search.
 *  Recurses into children (and DocTable's head/rows) but not into style props
 *  like className, so the index stays free of Tailwind class names. */
function collectText(node: ReactNode): string {
  if (node == null || typeof node === 'boolean') return ''
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  if (Array.isArray(node)) return node.map(collectText).join(' ')
  if (isValidElement(node)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const el = node as any
    if (el.type === DocTable) return `${collectText(el.props.head)} ${collectText(el.props.rows)}`
    return collectText(el.props?.children)
  }
  return ''
}

export type SearchEntry = { id: string; group: string; title: string; text: string }
const indexCache: Partial<Record<Lang, SearchEntry[]>> = {}

export function buildDocsIndex(lang: Lang): SearchEntry[] {
  if (!indexCache[lang]) {
    indexCache[lang] = DOCS.map((d) => ({
      id: d.id,
      group: d.group,
      title: d.title[lang],
      text: collectText(d.body(lang)).replace(/\s+/g, ' ').trim(),
    }))
  }
  return indexCache[lang]!
}

export const GROUPS: DocGroup[] = [
  { id: 'start', label: { en: 'Getting started', es: 'Primeros pasos' } },
  { id: 'use', label: { en: 'Using it', es: 'Uso' } },
  { id: 'privacy', label: { en: 'Privacy & safety', es: 'Privacidad y seguridad' } },
  { id: 'integrations', label: { en: 'Integrations', es: 'Integraciones' } },
  { id: 'reference', label: { en: 'Reference', es: 'Referencia' } },
]

const GH = 'https://github.com/cflarios/Tayori'

export const DOCS: DocSection[] = [
  /* ============================================================ getting started */
  {
    id: 'introduction',
    group: 'start',
    title: { en: 'Introduction', es: 'Introducción' },
    body: (l) =>
      l === 'es' ? (
        <>
          <p>
            <strong>Tayori</strong> es un asistente de IA en tiempo real para reuniones y entrevistas. Escucha la
            llamada, transcribe quién dice qué y sugiere respuestas en un overlay flotante que{' '}
            <strong>permanece invisible cuando compartes pantalla</strong>.
          </p>
          <p>
            Es open source (MIT), sin monetización. Todo corre en tu máquina y las llamadas van directas al proveedor
            de IA que elijas — <strong>no hay servidor intermedio</strong>.
          </p>
          <ul>
            <li>
              <strong>Escucha dos fuentes por separado</strong> — tu micrófono y el audio del sistema —, así sabe quién
              habla sin diarización.
            </li>
            <li>
              <strong>Transcribe en vivo</strong> con OpenAI, Gemini Live (~300&nbsp;ms) o Whisper local (offline).
            </li>
            <li>
              <strong>Sugiere respuestas</strong> con Claude, Gemini, ChatGPT, DeepSeek u Ollama, en streaming.
            </li>
            <li>
              <strong>Detecta preguntas</strong> dirigidas a ti — incluso disfrazadas de afirmación — y responde sola o
              solo con un atajo.
            </li>
            <li>
              <strong>Resuelve la pantalla</strong> con un modelo con visión: código (<Kbd>Ctrl+Alt+C</Kbd>), un test
              (<Kbd>Ctrl+Alt+Q</Kbd>) o cualquier otra cosa que haya en pantalla.
            </li>
            <li>
              <strong>Lee las respuestas en voz alta</strong> — voces del sistema, OpenAI o Piper local.
            </li>
            <li>
              <strong>Funciona 100% offline</strong> con Whisper local + Ollama.
            </li>
          </ul>
          <Callout tone="tip">
            <strong>El nombre.</strong> «Tayori» viene de <em>頼りになった</em> — «se volvió algo en lo que confiar».
          </Callout>
        </>
      ) : (
        <>
          <p>
            <strong>Tayori</strong> is a real-time AI assistant for meetings and interviews. It listens to the call,
            transcribes who says what, and suggests answers in a floating overlay that{' '}
            <strong>stays invisible when you share your screen</strong>.
          </p>
          <p>
            It's open source (MIT), with no monetization. Everything runs on your machine and calls go straight to the
            AI provider you pick — <strong>there is no server in between</strong>.
          </p>
          <ul>
            <li>
              <strong>Dual-source listening</strong> — your microphone and the system audio, captured separately — so
              it knows who is speaking without diarization.
            </li>
            <li>
              <strong>Live transcription</strong> with OpenAI, Gemini Live (~300&nbsp;ms) or Whisper local (offline).
            </li>
            <li>
              <strong>Answer suggestions</strong> with Claude, Gemini, ChatGPT, DeepSeek or Ollama, streamed as they
              are generated.
            </li>
            <li>
              <strong>Question detection</strong> — it spots questions aimed at you, even ones disguised as statements,
              and can answer automatically or only on a hotkey.
            </li>
            <li>
              <strong>Solve screen</strong> with a vision-capable model: code (<Kbd>Ctrl+Alt+C</Kbd>), a quiz
              (<Kbd>Ctrl+Alt+Q</Kbd>), or anything else on your screen.
            </li>
            <li>
              <strong>Reads answers aloud</strong> — system voices, OpenAI or local Piper.
            </li>
            <li>
              <strong>Fully offline</strong> when paired with Whisper local + Ollama.
            </li>
          </ul>
          <Callout tone="tip">
            <strong>The name.</strong> "Tayori" comes from <em>頼りになった</em> — "it became something you can rely on".
          </Callout>
        </>
      ),
  },
  {
    id: 'requirements',
    group: 'start',
    title: { en: 'Requirements', es: 'Requisitos' },
    body: (l) =>
      l === 'es' ? (
        <>
          <ul>
            <li>Windows 10 versión 2004 o superior (Windows 11 recomendado).</li>
            <li>Node.js 20+ y npm, solo para compilar desde el código.</li>
            <li>
              Al menos una API key:{' '}
              <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer">Anthropic</a>,{' '}
              <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer">Google AI Studio</a>,{' '}
              <a href="https://platform.openai.com" target="_blank" rel="noopener noreferrer">OpenAI</a> o{' '}
              <a href="https://platform.deepseek.com" target="_blank" rel="noopener noreferrer">DeepSeek</a>. Ollama y
              Whisper local no necesitan ninguna.
            </li>
          </ul>
          <ul>
            <li>Las de Google y OpenAI valen además para <strong>transcribir</strong>. Anthropic y DeepSeek solo responden.</li>
            <li><strong>DeepSeek no lee imágenes</strong>, así que no sirve para los botones de pantalla.</li>
          </ul>
        </>
      ) : (
        <>
          <ul>
            <li>Windows 10 version 2004 or newer (Windows 11 recommended).</li>
            <li>Node.js 20+ and npm, only to build from source.</li>
            <li>
              At least one API key:{' '}
              <a href="https://console.anthropic.com" target="_blank" rel="noopener noreferrer">Anthropic</a>,{' '}
              <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer">Google AI Studio</a>,{' '}
              <a href="https://platform.openai.com" target="_blank" rel="noopener noreferrer">OpenAI</a> or{' '}
              <a href="https://platform.deepseek.com" target="_blank" rel="noopener noreferrer">DeepSeek</a>. Ollama and
              Whisper local need none.
            </li>
          </ul>
          <ul>
            <li>The Google and OpenAI keys also work for <strong>transcription</strong>. Anthropic and DeepSeek only answer.</li>
            <li><strong>DeepSeek can't read images</strong>, so it doesn't work for the screen buttons.</li>
          </ul>
        </>
      ),
  },
  {
    id: 'installation',
    group: 'start',
    title: { en: 'Installation', es: 'Instalación' },
    body: (l) => (
      <>
        <p>
          {l === 'es'
            ? 'La forma más rápida es descargar el ejecutable portable desde el botón de descarga. Para compilar desde el código:'
            : 'The fastest path is the portable executable from the download button. To build from source:'}
        </p>
        <pre>
          <code>npm install{'\n'}npm run dev</code>
        </pre>
        <p>{l === 'es' ? 'Para generar instalador y portable (~98 MB cada uno):' : 'To generate an installer and a portable executable (~98 MB each):'}</p>
        <pre>
          <code>npm run build:win</code>
        </pre>
        <Callout tone="warn">
          {l === 'es' ? (
            <>
              El binario no está firmado, así que <strong>SmartScreen</strong> avisará la primera vez: «Más
              información» → «Ejecutar de todas formas».
            </>
          ) : (
            <>
              The binary is unsigned, so <strong>SmartScreen</strong> warns the first time: "More info" → "Run anyway".
            </>
          )}
        </Callout>
        <p>
          {l === 'es'
            ? 'Cada release incluye un SHA256SUMS.txt para verificar que la descarga es byte a byte lo que compiló CI:'
            : 'Every release ships a SHA256SUMS.txt so you can confirm the download is byte-for-byte what CI built:'}
        </p>
        <pre>
          <code>Get-FileHash Tayori-&lt;version&gt;-portable.exe -Algorithm SHA256</code>
        </pre>
      </>
    ),
  },
  {
    id: 'guided-setup',
    group: 'start',
    title: { en: 'Guided setup', es: 'Configuración guiada' },
    body: (l) =>
      l === 'es' ? (
        <>
          <p>
            La primera vez que abres el dashboard, un asistente lo deja todo funcionando sin que tengas que saber qué es
            un proveedor ni cuánta RAM tienes. Mide tu equipo y propone dos caminos:
          </p>
          <ul>
            <li>
              <strong>En la nube.</strong> Eliges Claude, Gemini, ChatGPT o DeepSeek, pegas la API key y listo. Pagas al
              proveedor por uso.
            </li>
            <li>
              <strong>En tu equipo.</strong> Si no tienes Ollama, lo instala con <code>winget</code> (con su aviso de
              permiso) y descarga dos modelos que le peguen a tu hardware: uno para conversar y otro para leer la
              pantalla.
            </li>
          </ul>
          <p>
            Después resuelve la transcripción (Gemini Live o Whisper local) y te ofrece pegar el CV. Nada se instala ni
            se descarga sin que lo pidas: cada acción va detrás de un botón que dice antes qué va a hacer.
          </p>
        </>
      ) : (
        <>
          <p>
            The first time you open the dashboard, a wizard gets everything working without you needing to know what a
            provider is or how much RAM you have. It measures your machine and proposes two paths:
          </p>
          <ul>
            <li>
              <strong>In the cloud.</strong> Pick Claude, Gemini, ChatGPT or DeepSeek, paste the API key, done. You pay
              the provider per use.
            </li>
            <li>
              <strong>On your machine.</strong> If you don't have Ollama, it installs it with <code>winget</code> (with
              its own permission prompt) and downloads two models that fit your hardware: one to converse and one to
              read the screen.
            </li>
          </ul>
          <p>
            Then it sorts out transcription (Gemini Live or Whisper local) and offers to paste your CV. Nothing is
            installed or downloaded without you asking: every action sits behind a button that says what it's about to
            do.
          </p>
        </>
      ),
  },
  {
    id: 'first-steps',
    group: 'start',
    title: { en: 'First steps', es: 'Primeros pasos' },
    body: (l) =>
      l === 'es' ? (
        <ol>
          <li>Arranca la app. Aparece solo el overlay, arriba a la derecha.</li>
          <li>Abre la configuración desde el menú <Kbd>⋯</Kbd> de su barra superior — es la única forma de abrirla.</li>
          <li>Pega tu API key de Anthropic, Google, OpenAI o DeepSeek.</li>
          <li>Elige <strong>qué se escucha</strong>. Por defecto son ambas fuentes; puedes dejar solo la salida del sistema.</li>
          <li>En <strong>Contexto</strong>, añade tu CV y la descripción del puesto: evita que el modelo invente experiencia y mejora el reconocimiento de nombres.</li>
          <li>Pulsa <strong>Empezar a escuchar</strong> y comprueba que los medidores se mueven.</li>
        </ol>
      ) : (
        <ol>
          <li>Launch the app. Only the overlay shows up, top-right.</li>
          <li>Open the settings from the <Kbd>⋯</Kbd> menu in its top bar — that's the only way to open it.</li>
          <li>Paste your API key for Anthropic, Google, OpenAI or DeepSeek.</li>
          <li>Choose <strong>what is heard</strong>. By default it's both sources; you can leave only the system output.</li>
          <li>In <strong>Context</strong>, add your CV and the job description: it stops the model inventing experience and improves name recognition.</li>
          <li>Press <strong>Start listening</strong> and check that the meters move.</li>
        </ol>
      ),
  },

  /* =================================================================== using it */
  {
    id: 'overlay',
    group: 'use',
    title: { en: 'The overlay', es: 'El overlay' },
    body: (l) =>
      l === 'es' ? (
        <>
          <p>Todo lo que se usa a mitad de una llamada está en la barra superior, sin abrir la configuración:</p>
          <ul>
            <li><strong>Escuchar / Escuchando</strong> — empieza y para la escucha. El pequeño desplegable de al lado abre qué <strong>fuentes</strong> se escuchan (tu micro, la salida del sistema o ambas). Si una fuente está configurada pero no llegó a abrirse, el control se pone <strong>ámbar</strong>.</li>
            <li><strong>Ojo (visibilidad)</strong> — activa o desactiva la exclusión de captura. Se pone <strong>rojo</strong> cuando el overlay es <em>visible</em> (el estado peligroso) y el panel gana un borde rojo punteado para que no compartas pantalla sin darte cuenta.</li>
            <li><strong>Resolver la pantalla</strong> — un botón con menú: <strong>Código</strong>, <strong>Test</strong> o <strong>Cualquier otra cosa</strong> (ayuda general con lo que haya en pantalla).</li>
            <li><Kbd>⋯</Kbd> — plegar el panel, configuración y salir.</li>
            <li><strong>Perfil y modelo</strong> — la fila de abajo: el perfil elige la forma de la respuesta y el desplegable de al lado el modelo de respuesta.</li>
            <li><strong>Pestañas Escuchar / Escribir</strong> — <strong>Escuchar</strong> sigue la llamada; <strong>Escribir</strong> es un chat donde tecleas una pregunta (<code>/skill</code> para invocar una, <Kbd>Tab</Kbd> para completarla) y los intercambios se apilan como un hilo. El <strong>+</strong> junto al campo adjunta una imagen (una captura nueva o una de tu PC), cada respuesta tiene botón de <strong>copiar</strong> (y de <strong>reproducir</strong> con las respuestas habladas activas), un botón de <strong>nueva conversación</strong> a la derecha de la fila de pestañas borra la transcripción y la memoria, y cada turno lleva etiquetado quién lo envió — tú, el entrevistador o Tayori.</li>
            <li><Kbd>‹ 2/5 ›</Kbd> — vuelve a respuestas anteriores sin abrir el historial.</li>
          </ul>
          <p>Muévelo arrastrando el <strong>grip</strong> — los seis puntos a la izquierda de la barra — o con <Kbd>Ctrl+Alt+flechas</Kbd>; solo el grip mueve la ventana, así el resto de la barra sigue clicable. Ocúltalo con <Kbd>Ctrl+Shift+H</Kbd>.</p>
        </>
      ) : (
        <>
          <p>Everything you use mid-call is in the top bar, without opening the settings:</p>
          <ul>
            <li><strong>Listen / Listening</strong> — starts and stops listening. The little caret next to it opens which <strong>sources</strong> are heard (your mic, the system output, or both). If a source is configured but didn't manage to open, the control turns <strong>amber</strong>.</li>
            <li><strong>Eye (visibility)</strong> — toggles whether the overlay is excluded from capture. It turns <strong>red</strong> when the overlay is <em>visible</em> (the risky state) and the panel gains a dashed red frame so you can't share your screen without noticing.</li>
            <li><strong>Solve screen</strong> — one button with a menu: <strong>Code</strong>, <strong>Quiz</strong>, or <strong>Anything else</strong> (general help with whatever's on screen).</li>
            <li><Kbd>⋯</Kbd> — collapse the panel, settings and quit.</li>
            <li><strong>Profile and model</strong> — the row below: the profile picks the shape of the answer and the dropdown next to it the answer model.</li>
            <li><strong>Listen / Write tabs</strong> — <strong>Listen</strong> follows the call; <strong>Write</strong> is a small chat where you type a question (<code>/skill</code> to invoke one, <Kbd>Tab</Kbd> to complete it) and the exchanges stack as a thread. The <strong>+</strong> by the input attaches an image (a fresh screenshot or one from your PC), each answer has a <strong>copy</strong> button (and a <strong>speak</strong> one when spoken answers are on), a <strong>new conversation</strong> button at the right of the tab row wipes the transcript and memory, and each turn is labelled by who sent it — you, the interviewer or Tayori.</li>
            <li><Kbd>‹ 2/5 ›</Kbd> — go back to earlier answers without opening the history.</li>
          </ul>
          <p>Move it by dragging the <strong>grip</strong> — the six dots at the left of the bar — or with <Kbd>Ctrl+Alt+arrows</Kbd>; only the grip moves the window, so the rest of the bar stays clickable. Hide it with <Kbd>Ctrl+Shift+H</Kbd>.</p>
        </>
      ),
  },
  {
    id: 'audio-devices',
    group: 'use',
    title: { en: 'Audio devices', es: 'Dispositivos de audio' },
    body: (l) =>
      l === 'es' ? (
        <>
          <p>
            Dos fuentes independientes — tu micrófono y la salida del sistema. En{' '}
            <em>dashboard → Audio → Dispositivos</em> eliges <strong>qué micrófono</strong> abre la captura y{' '}
            <strong>qué salida</strong> usa la reproducción, para equipos con más de uno de cada.
          </p>
          <p>
            El micrófono se aplica <strong>al instante</strong>: cámbialo mientras escuchas y los flujos se reabren con
            el nuevo. La salida no cambia lo que se captura (el loopback siempre es la mezcla por defecto) — es donde
            suenan las <strong>respuestas habladas</strong>, y un botón <strong>Probar salida</strong> comprueba el
            dispositivo antes de que confíes en él.
          </p>
        </>
      ) : (
        <>
          <p>
            Two independent sources — your microphone and the system output. In <em>dashboard → Audio → Devices</em> you
            choose <strong>which microphone</strong> the capture opens and <strong>which output</strong> playback uses,
            for machines with more than one of either.
          </p>
          <p>
            The microphone applies <strong>immediately</strong>: change it while listening and the streams reopen with
            the new one. The output doesn't change what's captured — the system loopback is always the default render
            mix — it's where the <strong>spoken answers</strong> play, and a <strong>Test output</strong> button checks
            the device before you rely on it.
          </p>
        </>
      ),
  },
  {
    id: 'spoken-answers',
    group: 'use',
    title: { en: 'Spoken answers', es: 'Respuestas habladas' },
    body: (l) =>
      l === 'es' ? (
        <>
          <p>
            Puede leer las respuestas del asistente <strong>en voz alta</strong>. Se enciende en{' '}
            <em>dashboard → Audio → Respuestas habladas</em> y eliges un <strong>motor</strong>:
          </p>
          <ul>
            <li>
              <strong>Voces del sistema</strong> (Web Speech) — gratis, offline, sin descarga. Usa las voces del SO;
              siempre suena en la salida <strong>por defecto</strong> (esta API no enruta a dispositivos).
            </li>
            <li>
              <strong>OpenAI</strong> — una voz de nube más natural; reutiliza tu key de OpenAI. Suena por la salida que
              elijas.
            </li>
            <li>
              <strong>Piper</strong> — un motor neural local. Elige una voz y <strong>descárgala</strong> una vez (el
              binario pequeño viene con la primera descarga); luego corre offline por tu salida.
            </li>
          </ul>
          <p>
            Ajusta la <strong>voz</strong> y la <strong>velocidad</strong>, y si <strong>leer las respuestas nuevas
            automáticamente</strong> — con eso apagado, cada respuesta tiene un botón de reproducir para las que quieras.
            Empezar una para cualquier otra en curso, y el botón alterna reproducir/parar.
          </p>
          <Callout tone="warn">
            <strong>Privacidad:</strong> las voces del sistema y Piper son <strong>locales</strong> — nada sale de tu
            máquina. <strong>OpenAI</strong> manda el texto de la respuesta a OpenAI para sintetizarlo, como cualquier
            llamada de nube.
          </Callout>
        </>
      ) : (
        <>
          <p>
            It can read the assistant's answers <strong>out loud</strong>. Turn it on in{' '}
            <em>dashboard → Audio → Spoken answers</em>, then pick an <strong>engine</strong>:
          </p>
          <ul>
            <li>
              <strong>System voices</strong> (Web Speech) — free, offline, zero download. Uses the OS voices; it always
              plays on the <strong>default</strong> output (this API has no device routing).
            </li>
            <li>
              <strong>OpenAI</strong> — a more natural cloud voice; reuses your OpenAI key. Plays through the output
              device you picked.
            </li>
            <li>
              <strong>Piper</strong> — a local neural engine. Choose a voice and <strong>download</strong> it once (the
              small binary comes along on the first download); it then runs offline through your chosen output.
            </li>
          </ul>
          <p>
            Set the <strong>voice</strong> and <strong>speed</strong>, and whether to <strong>read new answers
            automatically</strong> — with that off, each answer still has a speak button you press for the ones you want.
            Starting one answer stops any other, and the speak button toggles play/stop.
          </p>
          <Callout tone="warn">
            <strong>Privacy:</strong> system voices and Piper are <strong>local</strong> — nothing leaves the machine.{' '}
            <strong>OpenAI</strong> sends the answer's text to OpenAI to synthesize it, like any cloud call.
          </Callout>
        </>
      ),
  },
  {
    id: 'shortcuts',
    group: 'use',
    title: { en: 'Keyboard shortcuts', es: 'Atajos de teclado' },
    body: (l) => (
      <>
        <p>{l === 'es' ? 'Todos son globales: funcionan aunque la ventana de la videollamada tenga el foco.' : 'All of them are global: they work even when the video-call window has focus.'}</p>
        <DocTable
          head={[l === 'es' ? 'Atajo' : 'Shortcut', l === 'es' ? 'Acción' : 'Action']}
          rows={[
            [<Kbd>Ctrl+Enter</Kbd>, l === 'es' ? 'Responder ahora' : 'Answer now'],
            [<Kbd>Ctrl+Shift+S</Kbd>, l === 'es' ? 'Capturar pantalla y responder' : 'Capture screen and answer'],
            [<Kbd>Ctrl+Alt+C</Kbd>, l === 'es' ? 'Resolver el código en pantalla' : 'Solve the code on screen'],
            [<Kbd>Ctrl+Alt+Q</Kbd>, l === 'es' ? 'Responder el test en pantalla' : 'Answer the quiz on screen'],
            [<Kbd>Ctrl+Alt+A</Kbd>, l === 'es' ? 'Captura por trozos: recolectar' : 'Chunk capture: collect a chunk'],
            [<Kbd>Ctrl+Alt+S</Kbd>, l === 'es' ? 'Reconstruir y resolver los trozos' : 'Reconstruct and solve the chunks'],
            [<Kbd>Ctrl+Shift+H</Kbd>, l === 'es' ? 'Mostrar u ocultar el overlay' : 'Show or hide the overlay'],
            [<Kbd>Ctrl+Shift+M</Kbd>, l === 'es' ? 'Empezar o parar de escuchar' : 'Start or stop listening'],
            [<Kbd>Ctrl+Shift+C</Kbd>, l === 'es' ? 'Alternar clics atravesables' : 'Toggle click-through'],
            [<Kbd>Ctrl+Alt+←↑→↓</Kbd>, l === 'es' ? 'Mover el overlay' : 'Move the overlay'],
            [<Kbd>Ctrl+Alt+X / Z</Kbd>, l === 'es' ? 'Teleprompter: línea siguiente / anterior' : 'Teleprompter: next / previous line'],
          ]}
        />
        <p>
          {l === 'es'
            ? 'Todos se pueden cambiar y apagar en dashboard → Atajos de teclado. Apagar uno suelta la combinación para tu editor. Si Windows la rechaza porque otra app la tiene, aparece en rojo.'
            : 'All of them can be changed and turned off in dashboard → Keyboard shortcuts. Turning one off releases the combination for your editor. If Windows rejects one because another app holds it, it shows up in red.'}
        </p>
      </>
    ),
  },
  {
    id: 'screen-actions',
    group: 'use',
    title: { en: 'Solve screen', es: 'Resolver la pantalla' },
    body: (l) =>
      l === 'es' ? (
        <>
          <p>
            El botón <strong>Resolver la pantalla</strong> captura tu pantalla y te ayuda con lo que haya en ella. Su
            menú tiene tres casos, que comparten captura de alta calidad, perfil propio y modelo con visión:
          </p>
          <h3>Código</h3>
          <p>
            <Kbd>Ctrl+Alt+C</Kbd> — resuelve el ejercicio, el test en rojo o el stack trace que se vea: el código
            completo, listo para pegar, con botón <strong>Copiar</strong>. Si se corta, aparece <strong>Continuar</strong>{' '}
            y sigue desde donde se quedó, pegándose a la misma respuesta.
          </p>
          <h3>Test</h3>
          <p>
            <Kbd>Ctrl+Alt+Q</Kbd> — responde todas las preguntas que se vean, una línea por pregunta. Dos marcas:
          </p>
          <ul>
            <li><code>DUDA:</code> — el modelo no está seguro y da igualmente su mejor opción.</li>
            <li><code>NO SE VE:</code> — no se leían todas las opciones; repite con la pregunta entera a la vista.</li>
          </ul>
          <h3>Cualquier otra cosa</h3>
          <p>
            Ayuda general con lo demás — un error de configuración, unos logs, un diagrama o dibujo que explicar, pasar
            de un estado a otro. Este caso <strong>no tiene atajo</strong>: se llega desde el menú del botón.
          </p>
          <h3>Con qué modelo</h3>
          <Callout tone="warn">
            <strong>Necesita un modelo con visión</strong> (Claude, Gemini, OpenAI u Ollama multimodal). Puedes usar uno
            distinto del que responde a la voz en <em>dashboard → Modelo para la pantalla</em>.
          </Callout>
        </>
      ) : (
        <>
          <p>
            The <strong>Solve screen</strong> button captures your screen and helps with what's on it. Its menu has
            three cases, which share high-quality capture, their own profile and a vision-capable model:
          </p>
          <h3>Code</h3>
          <p>
            <Kbd>Ctrl+Alt+C</Kbd> — solves the exercise, failing test or stack trace in view: the complete code, ready
            to paste, with a <strong>Copy</strong> button. If it gets cut off, a <strong>Continue</strong> button picks
            up where it left off, glued to the same answer.
          </p>
          <h3>Quiz</h3>
          <p>
            <Kbd>Ctrl+Alt+Q</Kbd> — answers every question on screen, one line per question. Two marks:
          </p>
          <ul>
            <li><code>DOUBT:</code> — the model isn't sure and gives its best option anyway.</li>
            <li><code>NOT VISIBLE:</code> — not all options were readable; repeat with the whole question in view.</li>
          </ul>
          <h3>Anything else</h3>
          <p>
            General help with whatever else is there — a config error, some logs, a diagram or drawing to explain,
            getting from one state to another. This one has <strong>no hotkey</strong>; it's reached from the button's
            menu.
          </p>
          <h3>Which model</h3>
          <Callout tone="warn">
            <strong>It needs a vision-capable model</strong> (Claude, Gemini, OpenAI or multimodal Ollama). You can use a
            different one from the voice model in <em>dashboard → Model for the screen</em>.
          </Callout>
        </>
      ),
  },
  {
    id: 'chunk-capture',
    group: 'use',
    title: { en: 'Chunk capture', es: 'Captura por trozos' },
    body: (l) =>
      l === 'es' ? (
        <>
          <p>
            Para un enunciado que un entrevistador comparte y <strong>revela con scroll</strong>, y que no cabe en una
            sola captura. En vez de capturar-y-resolver, <strong>acumula</strong> varios frames y los manda juntos al
            modelo, que reconstruye el enunciado uniendo los solapes.
          </p>
          <ul>
            <li><Kbd>Ctrl+Alt+A</Kbd> recolecta un trozo. Púlsalo según scrolleas; un chip lleva la cuenta.</li>
            <li><Kbd>Ctrl+Alt+S</Kbd> reconstruye y resuelve la pila, y la vacía.</li>
          </ul>
          <p>Hay dos modos en <em>dashboard → Comportamiento → Captura por trozos</em>: <strong>Manual</strong> (cada pulsación añade un trozo) y <strong>Automático</strong> (un bucle captura solo y descarta repetidos).</p>
          <Callout tone="tip">
            <strong>Fija a pantalla completa</strong> el contenido compartido (el «pin» de Meet/Zoom) antes de recolectar,
            o el enunciado puede quedar ilegible.
          </Callout>
        </>
      ) : (
        <>
          <p>
            For a prompt an interviewer shares and <strong>reveals by scrolling</strong>, which doesn't fit in a single
            capture. Instead of capture-and-solve, it <strong>accumulates</strong> several frames and sends them
            together to the model, which reconstructs the prompt by stitching the overlaps.
          </p>
          <ul>
            <li><Kbd>Ctrl+Alt+A</Kbd> collects a chunk. Press it as you scroll; a chip keeps the count.</li>
            <li><Kbd>Ctrl+Alt+S</Kbd> reconstructs and solves the stack, and empties it.</li>
          </ul>
          <p>Two modes in <em>dashboard → Behavior → Chunk capture</em>: <strong>Manual</strong> (each press adds a chunk) and <strong>Automatic</strong> (a loop captures on its own and discards repeats).</p>
          <Callout tone="tip">
            <strong>Pin the shared content to full screen</strong> (the Meet/Zoom "pin") before collecting, or the prompt
            may end up illegible.
          </Callout>
        </>
      ),
  },
  {
    id: 'skills',
    group: 'use',
    title: { en: 'Skills', es: 'Skills' },
    body: (l) => (
      <>
        <p>
          {l === 'es'
            ? 'Una skill es una instrucción tuya que cambia cómo suena la respuesta — el tono y las palabras, no el formato. Se combina con el perfil (la forma) y el contexto (el material):'
            : 'A skill is an instruction of yours that changes how the answer sounds — the tone and words, not the format. It combines with the profile (the shape) and the context (the material):'}
        </p>
        <DocTable
          head={['', l === 'es' ? 'Decide' : 'Decides', l === 'es' ? 'Ejemplo' : 'Example']}
          rows={[
            [<strong>{l === 'es' ? 'Perfil' : 'Profile'}</strong>, l === 'es' ? 'La forma de la respuesta' : 'The shape of the answer', l === 'es' ? '4 viñetas, un bloque de código' : '4 bullets, a code block'],
            [<strong>{l === 'es' ? 'Contexto' : 'Context'}</strong>, l === 'es' ? 'El material' : 'The material', l === 'es' ? 'Tu CV, la oferta' : 'Your CV, the job offer'],
            [<strong>Skill</strong>, l === 'es' ? 'La manera de escribir' : 'The way of writing', l === 'es' ? 'Qué palabras evitar, qué tono' : 'Which words to avoid, what tone'],
          ]}
        />
        <Callout tone="info">
          {l === 'es'
            ? 'Los perfiles son tuyos para moldear (dashboard → Comportamiento): renombra o reescribe cualquiera de serie, oculta los que no uses, crea los tuyos desde cero y borra o restaura cualquiera. El intérprete es el único modo fijo, fuera de esa lista.'
            : 'The profiles are yours to shape (dashboard → Behavior): rename or rewrite any built-in, hide the ones you don’t use, create your own from scratch, and delete or restore any of them. The interpreter is the one fixed mode, kept out of that list.'}
        </Callout>
        <h3>{l === 'es' ? 'Escribir una' : 'Writing one'}</h3>
        <p>
          {l === 'es'
            ? 'Cada skill es una carpeta con un SKILL.md dentro (el formato de Anthropic, así que una skill de otra herramienta suele funcionar tal cual). Dashboard → Skills → Abrir carpeta te lleva a %APPDATA%\\Tayori\\skills. Los scripts y assets que el formato admite se ignoran a propósito: solo se lee el SKILL.md.'
            : 'Each skill is a folder with a SKILL.md inside (Anthropic’s format, so a skill from another tool usually works as-is). Dashboard → Skills → Open folder takes you to %APPDATA%\\Tayori\\skills. The scripts and assets the format allows are ignored on purpose: only the SKILL.md is read.'}
        </p>
        <h3>{l === 'es' ? 'Usarlas' : 'Using them'}</h3>
        <p>
          {l === 'es'
            ? 'Actívala desde el desplegable del overlay o el dashboard (aplica a todo, incluidas las respuestas automáticas), o escribe /nombre al principio de un mensaje. Solo hay una activa a la vez: dos instrucciones sobre cómo escribir se contradicen enseguida.'
            : 'Activate it from the overlay dropdown or the dashboard (it applies to everything, including automatic answers), or type /name at the start of a message. Only one is active at a time: two instructions about how to write contradict each other quickly.'}
        </p>
      </>
    ),
  },
  {
    id: 'interpreter',
    group: 'use',
    title: { en: 'Interpreter mode', es: 'Modo intérprete' },
    body: (l) =>
      l === 'es' ? (
        <>
          <p>
            Un <strong>modo</strong> que, en vez de sugerir respuestas, <strong>traduce</strong>. Se elige en el
            desplegable de Perfil (en el overlay o en <em>dashboard → Comportamiento</em>) — es un modo aparte, no uno de
            los perfiles editables — y los <strong>dos idiomas</strong> se fijan en{' '}
            <em>dashboard → Comportamiento → Idiomas del intérprete</em>, que siguen configurables esté o no activo.
          </p>
          <p>
            Con él activo, cada intervención se traduce <strong>al otro idioma, en los dos sentidos</strong>. Necesita la
            escucha y el disparo automático encendidos, y escuchar ambas fuentes. Es de una traducción a la vez.
          </p>
          <Callout tone="tip">
            <strong>El modelo importa aquí.</strong> Un modelo Flash de nube supera a cualquier local en traducción pura;
            en local, uno multilingüe como Aya Expanse funciona bien. No funciona con el audio directo de Gemini.
          </Callout>
        </>
      ) : (
        <>
          <p>
            A <strong>mode</strong> that, instead of suggesting answers, <strong>translates</strong>. Pick it from the
            Profile dropdown (in the overlay or in <em>dashboard → Behavior</em>) — it's a mode of its own, not one of
            the editable profiles — and set the <strong>two languages</strong> in{' '}
            <em>dashboard → Behavior → Interpreter languages</em>, which stay configurable whether or not it's active.
          </p>
          <p>
            With it on, each turn is translated <strong>to the other language, in both directions</strong>. It needs
            listening and auto-trigger on, and you need to hear both sources. It's one translation at a time.
          </p>
          <Callout tone="tip">
            <strong>A good model matters here.</strong> A cloud Flash-tier model beats any local one on pure
            translation; for local, a multilingual model like Aya Expanse works well. It doesn't work with Gemini's
            direct audio.
          </Callout>
        </>
      ),
  },
  {
    id: 'teleprompter',
    group: 'use',
    title: { en: 'Teleprompter mode', es: 'Modo teleprompter' },
    body: (l) =>
      l === 'es' ? (
        <>
          <p>
            Se enciende en <em>dashboard → General → Modo teleprompter</em> y cambia cómo se lee la respuesta terminada:
            <strong> una frase por línea</strong>, en columna estrecha, con la línea activa siempre en el mismo sitio.
          </p>
          <p>
            La razón: lo que delata que estás leyendo no es el tamaño de la letra, es el <strong>movimiento horizontal
            de los ojos</strong>. Una columna estrecha con la línea fija hace que los ojos casi no se muevan.
          </p>
          <p>Se avanza con <Kbd>Ctrl+Alt+X</Kbd> y se retrocede con <Kbd>Ctrl+Alt+Z</Kbd> (o clic / clic derecho). Es manual a propósito, y solo entra con la respuesta terminada.</p>
        </>
      ) : (
        <>
          <p>
            Turned on in <em>dashboard → General → Teleprompter mode</em>, it changes how the finished answer reads:
            <strong> one sentence per line</strong>, in a narrow column, with the active line always in the same spot.
          </p>
          <p>
            Why: what gives away that you're reading isn't font size, it's the <strong>horizontal movement of your
            eyes</strong>. A narrow column with the line fixed keeps your eyes almost still.
          </p>
          <p>Advance with <Kbd>Ctrl+Alt+X</Kbd> and go back with <Kbd>Ctrl+Alt+Z</Kbd> (or click / right-click). It's manual on purpose, and only kicks in with the answer finished.</p>
        </>
      ),
  },

  /* ============================================================ privacy & safety */
  {
    id: 'invisible-mode',
    group: 'privacy',
    title: { en: 'Invisible mode', es: 'Modo invisible' },
    body: (l) =>
      l === 'es' ? (
        <>
          <p>
            En Windows, el modo invisible llama a <code>SetWindowDisplayAffinity</code> con{' '}
            <code>WDA_EXCLUDEFROMCAPTURE</code>. El compositor del sistema omite la ventana al construir el buffer de
            captura, así que <strong>no aparece</strong> en:
          </p>
          <ul>
            <li>Compartir pantalla de Meet, Teams, Zoom, Discord y similares.</li>
            <li>Grabadores como OBS con «Display Capture».</li>
            <li>La herramienta de recorte de Windows y las capturas de la propia app.</li>
          </ul>
          <p>Aplica al overlay <strong>y a la ventana de configuración</strong> (que tiene tus keys, tu CV y el historial).</p>
          <h3>De qué no protege</h3>
          <Callout tone="warn">
            <strong>No te protege de:</strong> una cámara apuntando a tu pantalla, software de proctoring que enumere
            procesos, lo que digas en voz alta, o alguien mirando por encima de tu hombro.
          </Callout>
          <h3>El señuelo de la barra de tareas</h3>
          <p>
            Por defecto ni el overlay ni la configuración aparecen en la <strong>barra de tareas</strong>. Si prefieres
            esconderte <em>a la vista</em> en vez de estar ausente, <em>dashboard → General</em> ofrece un{' '}
            <strong>señuelo</strong>: el overlay mantiene una entrada en la barra <strong>disfrazada de herramienta de
            Windows</strong> (Terminal, Configuración o Administrador de tareas), con su icono y título. Sigue excluido de
            la captura, así que el disfraz es solo para quien mire tu barra de reojo. El modo stealth conserva la entrada
            disfrazada; solo con el señuelo apagado desaparece del todo.
          </p>
          <h3>En el Administrador de tareas</h3>
          <p>
            Requiere Windows 10 2004+. En versiones anteriores degrada a <code>WDA_MONITOR</code> y la ventana sale como
            un rectángulo negro. El proceso se llama <strong>Tayori</strong> en el Administrador de tareas; eso es
            cosmético, lo que oculta la app es la exclusión de captura, no el nombre.
          </p>
        </>
      ) : (
        <>
          <p>
            On Windows, invisible mode calls <code>SetWindowDisplayAffinity</code> with{' '}
            <code>WDA_EXCLUDEFROMCAPTURE</code>. The system compositor skips the window when building the capture
            buffer, so it <strong>doesn't appear</strong> in:
          </p>
          <ul>
            <li>Screen sharing on Meet, Teams, Zoom, Discord and the like.</li>
            <li>Recorders like OBS with "Display Capture".</li>
            <li>The Windows Snipping Tool and the app's own screenshots.</li>
          </ul>
          <p>It applies to the overlay <strong>and the settings window</strong> (which has your keys, your CV and the history).</p>
          <h3>What it doesn't protect from</h3>
          <Callout tone="warn">
            <strong>It does not protect you from:</strong> a camera pointed at your screen, proctoring software that
            enumerates processes, what you say out loud, or someone looking over your shoulder.
          </Callout>
          <h3>A decoy taskbar entry</h3>
          <p>
            By default neither the overlay nor the settings appears in the <strong>taskbar</strong>. If you'd rather hide{' '}
            <em>in plain sight</em> than be absent, <em>dashboard → General</em> offers a <strong>decoy</strong>: the
            overlay keeps a taskbar entry <strong>disguised as a Windows tool</strong> (Terminal, Settings or Task
            Manager), with the matching icon and title. It stays excluded from screen capture, so the disguise is only for
            someone glancing at your taskbar. Stealth mode keeps the disguised entry; only with the decoy off does the
            overlay vanish from the taskbar entirely.
          </p>
          <h3>In Task Manager</h3>
          <p>
            It requires Windows 10 2004+. On older versions it degrades to <code>WDA_MONITOR</code> and the window comes
            out as a black rectangle. The process is called <strong>Tayori</strong> in Task Manager; that's cosmetic —
            what hides the app is the capture exclusion, not the name.
          </p>
        </>
      ),
  },
  {
    id: 'hidden-instructions',
    group: 'privacy',
    title: { en: 'Hidden instructions', es: 'Órdenes escondidas' },
    body: (l) =>
      l === 'es' ? (
        <>
          <p>
            La app le pasa al modelo cosas que no escribes tú: lo que dice la otra persona, lo que hay en una captura y
            lo que pegas en <em>Contexto</em>. Cualquiera puede traer una frase dirigida al asistente
            («ignora las instrucciones anteriores»).
          </p>
          <p>
            Todo ese material viaja <strong>marcado como material</strong>, nunca como instrucciones, y el system prompt
            dice explícitamente que lo de dentro se reporta y no se obedece. Si pasa, el asistente <strong>te lo dice</strong>{' '}
            en una línea y sigue respondiendo a la pregunta real.
          </p>
          <Callout tone="info">
            Esto <strong>reduce</strong> el riesgo, no lo elimina. La última palabra la tiene el modelo. Si una respuesta
            se comporta raro justo tras aparecer un texto largo en pantalla, sospecha de eso.
          </Callout>
        </>
      ) : (
        <>
          <p>
            The app passes the model things you don't type: what the other person says, what's in a screenshot and what
            you paste into <em>Context</em>. Any of those can carry a phrase aimed at the assistant ("ignore the
            previous instructions").
          </p>
          <p>
            All that material travels <strong>marked as material</strong>, never as instructions, and the system prompt
            explicitly says what's inside is to be reported and not obeyed. If it happens, the assistant{' '}
            <strong>tells you</strong> in one line and keeps answering the real question.
          </p>
          <Callout tone="info">
            This <strong>reduces</strong> the risk, it doesn't eliminate it. The last word belongs to the model. If an
            answer behaves oddly right after a long text shows up on screen, suspect that.
          </Callout>
        </>
      ),
  },
  {
    id: 'privacy-data',
    group: 'privacy',
    title: { en: 'Data & legal', es: 'Datos y aspectos legales' },
    body: (l) =>
      l === 'es' ? (
        <>
          <p>
            <strong>El audio nunca toca el disco.</strong> Los fragmentos van al motor de transcripción y se descartan
            en el acto (la única excepción es el WAV temporal de whisper-cli, que se borra tras cada llamada). Solo se
            guarda <strong>texto</strong>, y solo si dejas el historial encendido.
          </p>
          <ul>
            <li><strong>Historial opt-in.</strong> Apagado, nada toca el disco. Puedes ver la ruta, borrar una conversación o todas.</li>
            <li><strong>Keys cifradas con DPAPI</strong>, atadas a tu cuenta de Windows. El renderer solo ve un booleano.</li>
            <li><strong>OpenAI</strong> guarda por defecto cada respuesta; la app lo desactiva con <code>store: false</code>.</li>
          </ul>
          <Callout tone="warn">
            <strong>Aspectos legales.</strong> Con el historial encendido se guarda la transcripción, que en varias
            jurisdicciones cuenta como una grabación. Muchas empresas restringen los asistentes de IA en sus procesos, y
            las plataformas de evaluación técnica suelen prohibirlo. La responsabilidad de usar esto es tuya.
          </Callout>
        </>
      ) : (
        <>
          <p>
            <strong>Audio never touches the disk.</strong> Chunks go to the transcription engine and are discarded on
            the spot (the only exception is whisper-cli's temporary WAV, deleted after each call). Only <strong>text</strong>{' '}
            is saved, and only if you leave history on.
          </p>
          <ul>
            <li><strong>History is opt-in.</strong> Off, nothing touches the disk. You can see the path, delete one conversation or all.</li>
            <li><strong>Keys encrypted with DPAPI</strong>, tied to your Windows account. The renderer only sees a boolean.</li>
            <li><strong>OpenAI</strong> stores each response by default; the app disables it with <code>store: false</code>.</li>
          </ul>
          <Callout tone="warn">
            <strong>Legal.</strong> With history on, the transcript is stored, which in several jurisdictions counts as a
            recording. Many companies restrict AI assistants in their processes, and technical-assessment platforms often
            prohibit it. The responsibility for using this is yours.
          </Callout>
        </>
      ),
  },

  /* ============================================================== integrations */
  {
    id: 'phone-mirror',
    group: 'integrations',
    title: { en: 'Phone mirror', es: 'Espejo en el móvil' },
    body: (l) =>
      l === 'es' ? (
        <>
          <p>
            Saca las respuestas de la pantalla compartida del todo: tu ordenador sirve una página al navegador de tu
            teléfono, en tu propia red. Se enciende en <em>Ajustes → Espejo en el móvil</em>, escaneas el QR y listo. Es
            de <strong>solo lectura</strong> y guarda las últimas 20 respuestas.
          </p>
          <DocTable
            head={['', '']}
            rows={[
              [l === 'es' ? 'Qué se manda' : 'Sent', l === 'es' ? 'Las respuestas y si la escucha está activa' : 'The answers and whether listening is active'],
              [l === 'es' ? 'Qué no se manda' : 'Not sent', l === 'es' ? 'La transcripción' : 'The transcript'],
              [l === 'es' ? 'Por dónde' : 'Where', l === 'es' ? 'Tu red local, sin nube ni cuenta' : 'Your local network, no cloud or account'],
            ]}
          />
          <p>Dos interruptores, ambos empiezan apagados: <strong>encender el espejo</strong> y <strong>permitir acceso desde la red local</strong> (un teléfono necesita este último).</p>
          <Callout tone="warn">
            El enlace lleva un token que cambia en cada arranque, pero <strong>mientras el espejo esté encendido, quien
            tenga ese enlace y esté en tu red puede leer tus respuestas</strong>.
          </Callout>
        </>
      ) : (
        <>
          <p>
            It takes the answers off the shared screen entirely: your computer serves a page to your phone's browser, on
            your own network. Turn it on in <em>Settings → Phone mirror</em>, scan the QR and that's it. It's{' '}
            <strong>read-only</strong> and keeps the last 20 answers.
          </p>
          <DocTable
            head={['', '']}
            rows={[
              ['Sent', 'The answers and whether listening is active'],
              ['Not sent', 'The transcript'],
              ['Where', 'Your local network, no cloud or account'],
            ]}
          />
          <p>Two switches, both start off: <strong>turn on the mirror</strong> and <strong>allow access from the local network</strong> (a phone needs the latter).</p>
          <Callout tone="warn">
            The link carries a token that changes on every launch, but <strong>while the mirror is on, anyone with that
            link and on your network can read your answers</strong>.
          </Callout>
        </>
      ),
  },
  {
    id: 'mqtt',
    group: 'integrations',
    title: { en: 'MQTT', es: 'MQTT' },
    body: (l) => (
      <>
        <p>
          {l === 'es'
            ? 'Con esto encendido, cada respuesta terminada se publica en un broker MQTT para que la recoja otra cosa: un ESP32, un script, un Home Assistant. Se configura en Ajustes → MQTT.'
            : 'With this on, each finished answer is published to an MQTT broker so something else can pick it up: an ESP32, a script, a Home Assistant. Configure it in Settings → MQTT.'}
        </p>
        <DocTable
          head={[l === 'es' ? 'Tema' : 'Topic', l === 'es' ? 'Contenido' : 'Content']}
          rows={[
            [<code>&lt;topic&gt;</code>, l === 'es' ? 'JSON con id, trigger, question, answer, model, at' : 'JSON with id, trigger, question, answer, model, at'],
            [<code>&lt;topic&gt;/text</code>, l === 'es' ? 'Solo el texto de la respuesta, en crudo' : 'Just the answer text, raw'],
          ]}
        />
        <pre>
          <code>{`// ESP32, con PubSubClient\nclient.subscribe("tayori/answer/text");\n// callback(topic, payload, length)`}</code>
        </pre>
        <ul>
          <li>{l === 'es' ? 'Solo respuestas completas. Ni errores ni canceladas.' : 'Complete answers only. No errors or cancelled ones.'}</li>
          <li>{l === 'es' ? 'QoS 1 y sin retener. La contraseña se cifra con DPAPI.' : 'QoS 1 and not retained. The password is encrypted with DPAPI.'}</li>
        </ul>
        <Callout tone="warn">
          {l === 'es'
            ? 'Esto saca tus respuestas de la app. Un broker sin usuario ni TLS es un tablón público — usa mqtts:// fuera de tu red.'
            : 'This takes your answers out of the app. A broker with no user and no TLS is a public noticeboard — use mqtts:// outside your network.'}
        </Callout>
        <p>
          {l === 'es' ? 'La librería compañera para ESP32 está en ' : 'The companion ESP32 library is at '}
          <a href="https://github.com/cflarios/TayoriESP32" target="_blank" rel="noopener noreferrer">TayoriESP32</a>.
        </p>
      </>
    ),
  },

  /* ================================================================= reference */
  {
    id: 'models',
    group: 'reference',
    title: { en: 'Models & latency', es: 'Modelos y latencia' },
    body: (l) => (
      <>
        <p>{l === 'es' ? 'El compromiso entre latencia y privacidad, por motor de transcripción:' : 'The trade-off between latency and privacy, by transcription engine:'}</p>
        <DocTable
          head={[l === 'es' ? 'Motor' : 'Engine', l === 'es' ? 'Latencia' : 'Latency', l === 'es' ? 'Dónde va el audio' : 'Where the audio goes']}
          rows={[
            ['OpenAI live', '~300 ms', 'OpenAI'],
            ['Gemini Live', '~300 ms', 'Google'],
            [l === 'es' ? 'Gemini audio directo' : 'Gemini direct audio', '~1–2 s', 'Google'],
            ['Whisper local', '~0.8–1.5 s', l === 'es' ? 'A ningún sitio' : 'Nowhere'],
          ]}
        />
        <h3>{l === 'es' ? 'La guía de modelos' : 'The model guide'}</h3>
        <p>
          {l === 'es'
            ? 'El dashboard mide tu RAM, CPU y GPU y recomienda dos modelos locales (conversar y pantalla) con el comando ollama pull listo. El botón «Abrir la guía» genera un documento con todos los modelos por tramo de memoria, los multimodales aparte y los de pago por precio.'
            : 'The dashboard measures your RAM, CPU and GPU and recommends two local models (converse and screen) with the ollama pull command ready. "Open the guide" generates a document with all models by memory tier, the multimodal ones separately, and the paid ones by price.'}
        </p>
        <h3>{l === 'es' ? 'El contexto de Ollama' : 'Ollama’s context window'}</h3>
        <Callout tone="warn">
          {l === 'es' ? (
            <>
              <strong>Ollama recorta el contexto sin avisar</strong> (2048 tokens por defecto), y el síntoma es que el
              modelo olvida lo que le acabas de decir. Súbelo en <em>dashboard → Transcripción → Ventana de contexto</em>;
              la app pide 8192.
            </>
          ) : (
            <>
              <strong>Ollama trims the context without warning</strong> (2048 tokens by default), and the symptom is the
              model forgetting what you just told it. Raise it in <em>dashboard → Transcription → Context window</em>;
              the app asks for 8192.
            </>
          )}
        </Callout>
        <h3>{l === 'es' ? 'La memoria de la conversación' : 'Conversation memory'}</h3>
        {l === 'es' ? (
          <p>
            El overlay muestra un chip de memoria en la cabecera de la respuesta con los intercambios que el asistente
            reenvía en cada consulta. En un modelo <strong>local (Ollama)</strong> los cuenta — <code>memory n/8</code>,
            y se pone rojo al llenarse — porque esos turnos aprietan contra su ventana pequeña. En uno de{' '}
            <strong>nube</strong> hay sitio de sobra: el tope sube a 40 y el chip pierde el contador (queda en el
            tooltip), quedando como un simple botón de <em>olvidar</em>. Pulsarlo hace que el asistente los olvide, y{' '}
            <strong>no</strong> es lo mismo que «nueva conversación»: la transcripción y el historial se quedan igual.
          </p>
        ) : (
          <p>
            The overlay shows a memory chip in the answer header for the exchanges the assistant resends on each query.
            On a <strong>local model (Ollama)</strong> it counts them — <code>memory n/8</code>, turning red when full —
            because those turns press against its small context window. On a <strong>cloud model</strong> there's room
            to spare: the cap rises to 40 and the chip drops the counter (it stays in the tooltip), reading as a plain{' '}
            <em>forget</em> button. Clicking it makes the assistant forget them, and it's <strong>not</strong> the same
            as "new conversation": the transcript and history stay as they are.
          </p>
        )}
      </>
    ),
  },
  {
    id: 'language-updates',
    group: 'reference',
    title: { en: 'Language & updates', es: 'Idioma y actualizaciones' },
    body: (l) =>
      l === 'es' ? (
        <>
          <p>
            La interfaz está en <strong>inglés y español</strong>. Arranca en inglés salvo que sea el primer arranque y
            tu Windows esté en español; se cambia en <em>dashboard → General → Idioma</em>. No tiene nada que ver con el
            idioma en el que hablas en la reunión, que se elige en <em>Transcripción</em>.
          </p>
          <p>
            <strong>El idioma de la respuesta también se puede fijar.</strong> Por defecto el modelo responde en el
            idioma de la conversación (o, en una acción de pantalla, el de lo que se ve). Si prefieres fijarlo — siempre
            en inglés, por ejemplo, aunque la pantalla esté en otro idioma — ponlo en{' '}
            <em>dashboard → Modelo de respuesta → Idioma de respuesta</em>. Déjalo en <strong>Automático</strong> para el
            comportamiento por defecto.
          </p>
          <p>
            <em>Dashboard → Acerca de</em> resume qué es la app y qué versión tienes, con un botón{' '}
            <strong>Buscar actualizaciones</strong> que pregunta a GitHub si hay una versión más nueva y, si la hay,
            muestra los cambios y un botón para descargar el nuevo portable. Nada se descarga ni instala solo.
          </p>
          <p>
            Cuatro documentos en el repo: README, <a href={`${GH}/blob/main/USAGE.md`} target="_blank" rel="noopener noreferrer">USAGE</a>,{' '}
            <a href={`${GH}/blob/main/ARCHITECTURE.md`} target="_blank" rel="noopener noreferrer">ARCHITECTURE</a> y CONTEXT.
          </p>
        </>
      ) : (
        <>
          <p>
            The interface is in <strong>English and Spanish</strong>. It starts in English unless it's the first launch
            and your Windows is in Spanish; it's changed in <em>dashboard → General → Language</em>. It has nothing to do
            with the language you speak in the meeting, which is chosen in <em>Transcription</em>.
          </p>
          <p>
            <strong>The answer language can also be pinned.</strong> By default the model answers in the conversation's
            language (or, for a screen action, the language of what's on the screen). To fix it — always in English, say,
            even when the screen is in another language — set it in{' '}
            <em>dashboard → Answering model → Answer language</em>. Leave it on <strong>Automatic</strong> for the default
            behaviour.
          </p>
          <p>
            <em>Dashboard → About</em> sums up what the app is and which version you have, with a{' '}
            <strong>Check for updates</strong> button that asks GitHub whether there's a newer version and, if so, shows
            the changes and a button to download the new portable. Nothing downloads or installs on its own.
          </p>
          <p>
            Four documents in the repo: README, <a href={`${GH}/blob/main/USAGE.md`} target="_blank" rel="noopener noreferrer">USAGE</a>,{' '}
            <a href={`${GH}/blob/main/ARCHITECTURE.md`} target="_blank" rel="noopener noreferrer">ARCHITECTURE</a> and CONTEXT.
          </p>
        </>
      ),
  },
]
