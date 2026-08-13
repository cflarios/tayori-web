import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Lang = 'en' | 'es'

/** Full bilingual copy for the landing. One object per language, same shape. */
export const dict = {
  en: {
    nav: { features: 'Features', privacy: 'Privacy', how: 'How it works', download: 'Download' },
    hero: {
      badge: 'Open source · MIT · Runs on your machine',
      title: ['Your AI wingman for the call.', 'Invisible when you share your screen.'],
      sub: 'Tayori listens to your meeting, transcribes who says what, and suggests answers in a floating overlay — one that stays hidden from Meet, Zoom, Teams and OBS while you share your screen.',
      ctaDownload: 'Download for Windows',
      ctaGithub: 'View source',
      note: 'Free forever. No account, no server, no telemetry.',
    },
    invisible: {
      kicker: 'The whole point',
      title: 'It disappears the moment you share your screen',
      body: 'Tayori calls Windows’ own capture-exclusion flag (WDA_EXCLUDEFROMCAPTURE). The system compositor skips the overlay when it builds the shared frame — so your suggestions are on your monitor, but not in the stream.',
      hiddenTitle: 'Hidden from',
      hidden: ['Google Meet, Zoom, Teams, Discord', 'OBS “Display Capture” recorders', 'Windows Snipping Tool & app screenshots'],
      honestTitle: 'Honest about the limits',
      honest: ['A camera pointed at your screen', 'Proctoring that enumerates processes', 'Anything you read out loud'],
      honestNote: 'We tell you exactly what it does and doesn’t protect — including the process name being cosmetic, not a rootkit.',
    },
    features: {
      kicker: 'What it does',
      title: 'Built for the moment someone asks you a hard question',
      sub: 'Every feature exists to buy you a few seconds of composure — on a job interview, a client call, or a live technical test.',
      items: [
        { icon: 'ears', t: 'Two sources, no diarization', d: 'Listens to your mic and system audio separately, so it always knows who is talking without guessing.' },
        { icon: 'wave', t: 'Live transcription', d: 'OpenAI, Gemini Live (~300 ms) or local Whisper, fully offline. Your CV sharpens name and acronym recognition.' },
        { icon: 'spark', t: 'Suggested answers', d: 'Claude, Gemini, ChatGPT, DeepSeek or Ollama, streamed into the overlay. It detects questions aimed at you and can answer on its own.' },
        { icon: 'globe', t: 'Interpreter mode', d: 'Speak one language, it translates to the other — in both directions, detecting the language of each sentence by itself.' },
        { icon: 'code', t: 'Solve code & quizzes on screen', d: 'Ctrl+Alt+C reads a LeetCode prompt or failing test and returns the full solution. Ctrl+Alt+Q answers multiple-choice, one line each.' },
        { icon: 'layers', t: 'Chunk capture', d: 'For a shared screen revealed by scrolling: collect frames one per keystroke, then rebuild the full prompt from the overlaps.' },
        { icon: 'book', t: 'Skills', d: 'Your own SKILL.md instructions that change how the answer sounds — the tone and words, not the format. Anthropic’s format, drop-in.' },
        { icon: 'read', t: 'Teleprompter mode', d: 'One sentence per line in a narrow column with the active line fixed, so your eyes barely move and it doesn’t look like you’re reading.' },
        { icon: 'phone', t: 'Phone mirror', d: 'Serves answers to your phone over your own LAN — off the shared screen entirely. QR to pair, read-only, no cloud.' },
      ],
    },
    how: {
      kicker: 'How it works',
      title: 'Running in about two minutes',
      steps: [
        { n: '01', t: 'Pick a brain', d: 'Paste an API key for Claude, Gemini, ChatGPT or DeepSeek — or run fully local with Ollama + Whisper. A guided setup measures your machine and recommends models.' },
        { n: '02', t: 'Start listening', d: 'Hit “Start”. The meters move, the overlay sits top-right, and nothing touches disk unless you turn on history.' },
        { n: '03', t: 'Read the overlay', d: 'Questions aimed at you get answered in four tight bullets — or full code, or a quiz line. Glance, don’t read. Ctrl+Shift+H hides it all.' },
      ],
    },
    privacy: {
      kicker: 'Privacy by construction',
      title: 'The audio never touches your disk',
      sub: 'Audio chunks go to the transcription engine and are discarded on the spot — no audio file is ever written, not even a temporary one. Calls go straight to the provider you choose. There is no middle server.',
      cards: [
        { t: 'Local option, zero network', d: 'Whisper local + Ollama means nothing leaves your machine. Tayori works completely offline.' },
        { t: 'Keys encrypted with DPAPI', d: 'API keys are stored with Windows safeStorage, tied to your user account. The renderer only ever sees a boolean.' },
        { t: 'History is off by default', d: 'Text history can be switched off entirely. With it off, nothing is written and the app just listens and forgets.' },
        { t: 'Prompt-injection aware', d: 'Anything the app reads — the other person, a screenshot, a pasted job post — travels marked as material, never as commands.' },
      ],
    },
    providers: { kicker: 'Bring your own model', title: 'Five providers. Or none at all.' },
    download: {
      kicker: 'Get Tayori',
      title: 'Download and run — no installer required',
      sub: 'A portable Windows executable, about 98 MB. No sign-up, no license key. Grab it and go.',
      cta: 'Download for Windows',
      version: 'latest release',
      reqTitle: 'Requirements',
      req: ['Windows 10 v2004+ (Windows 11 recommended)', 'At least one API key — or none, with Ollama + Whisper', 'The binary is unsigned: SmartScreen will warn once → “More info” → “Run anyway”'],
      alt: 'Prefer to build from source?',
      altCta: 'Read the README',
    },
    footer: {
      tagline: 'Real-time AI for meetings and interviews. Open source, MIT, no monetization.',
      madeBy: 'Built by',
      cols: {
        product: 'Product',
        resources: 'Resources',
        productLinks: [
          { t: 'Features', href: '#features' },
          { t: 'Privacy', href: '#privacy' },
          { t: 'Download', href: '#download' },
        ],
        resourceLinks: [
          { t: 'GitHub', href: 'https://github.com/cflarios/Tayori' },
          { t: 'README', href: 'https://github.com/cflarios/Tayori/blob/main/README.md' },
          { t: 'Architecture', href: 'https://github.com/cflarios/Tayori/blob/main/ARCHITECTURE.md' },
          { t: 'TayoriESP32', href: 'https://github.com/cflarios/TayoriESP32' },
        ],
      },
      legal: 'Tayori is a tool. How and where you use it is your responsibility — many companies restrict AI assistants in hiring, and technical-assessment platforms often forbid it outright.',
    },
  },

  es: {
    nav: { features: 'Funciones', privacy: 'Privacidad', how: 'Cómo funciona', download: 'Descargar' },
    hero: {
      badge: 'Open source · MIT · Corre en tu equipo',
      title: ['Tu copiloto de IA para la llamada.', 'Invisible cuando compartes pantalla.'],
      sub: 'Tayori escucha tu reunión, transcribe quién dice qué y sugiere respuestas en un overlay flotante — uno que permanece oculto en Meet, Zoom, Teams y OBS mientras compartes pantalla.',
      ctaDownload: 'Descargar para Windows',
      ctaGithub: 'Ver el código',
      note: 'Gratis para siempre. Sin cuenta, sin servidor, sin telemetría.',
    },
    invisible: {
      kicker: 'La idea entera',
      title: 'Desaparece en el momento en que compartes pantalla',
      body: 'Tayori usa el propio flag de exclusión de captura de Windows (WDA_EXCLUDEFROMCAPTURE). El compositor del sistema omite el overlay al construir el frame compartido — así que tus sugerencias están en tu monitor, pero no en la transmisión.',
      hiddenTitle: 'Oculto de',
      hidden: ['Google Meet, Zoom, Teams, Discord', 'Grabadores como OBS con “Display Capture”', 'Recortes de Windows y capturas de la app'],
      honestTitle: 'Honesto con sus límites',
      honest: ['Una cámara apuntando a tu pantalla', 'Proctoring que enumera procesos', 'Lo que digas en voz alta'],
      honestNote: 'Te decimos exactamente qué protege y qué no — incluido que el nombre del proceso es cosmético, no un rootkit.',
    },
    features: {
      kicker: 'Qué hace',
      title: 'Hecho para el momento en que alguien te lanza una pregunta difícil',
      sub: 'Cada función existe para ganarte unos segundos de aplomo — en una entrevista, una llamada con un cliente o una prueba técnica en vivo.',
      items: [
        { icon: 'ears', t: 'Dos fuentes, sin diarización', d: 'Escucha tu micro y el audio del sistema por separado, así siempre sabe quién habla sin adivinar.' },
        { icon: 'wave', t: 'Transcripción en vivo', d: 'OpenAI, Gemini Live (~300 ms) o Whisper local, totalmente offline. Tu CV afina el reconocimiento de nombres y siglas.' },
        { icon: 'spark', t: 'Respuestas sugeridas', d: 'Claude, Gemini, ChatGPT, DeepSeek u Ollama, en streaming en el overlay. Detecta preguntas dirigidas a ti y puede responder solo.' },
        { icon: 'globe', t: 'Modo intérprete', d: 'Habla en un idioma y traduce al otro — en los dos sentidos, detectando solo el idioma de cada frase.' },
        { icon: 'code', t: 'Resuelve código y tests en pantalla', d: 'Ctrl+Alt+C lee un ejercicio de LeetCode o un test que falla y devuelve la solución completa. Ctrl+Alt+Q responde opción múltiple, una línea por pregunta.' },
        { icon: 'layers', t: 'Captura por trozos', d: 'Para una pantalla compartida que se revela con scroll: recolecta frames uno por pulsación y reconstruye el enunciado completo uniendo los solapes.' },
        { icon: 'book', t: 'Skills', d: 'Tus instrucciones en SKILL.md que cambian cómo suena la respuesta — el tono y las palabras, no el formato. Formato de Anthropic, listo para usar.' },
        { icon: 'read', t: 'Modo teleprompter', d: 'Una frase por línea en columna estrecha con la línea activa fija, para que los ojos casi no se muevan y no parezca que lees.' },
        { icon: 'phone', t: 'Espejo en el móvil', d: 'Sirve las respuestas a tu teléfono por tu propia red — fuera de la pantalla compartida del todo. QR para vincular, solo lectura, sin nube.' },
      ],
    },
    how: {
      kicker: 'Cómo funciona',
      title: 'Funcionando en unos dos minutos',
      steps: [
        { n: '01', t: 'Elige un cerebro', d: 'Pega una API key de Claude, Gemini, ChatGPT o DeepSeek — o corre 100% local con Ollama + Whisper. Un asistente mide tu equipo y recomienda modelos.' },
        { n: '02', t: 'Empieza a escuchar', d: 'Pulsa “Empezar”. Los medidores se mueven, el overlay se sitúa arriba a la derecha, y nada toca el disco salvo que actives el historial.' },
        { n: '03', t: 'Lee el overlay', d: 'Las preguntas dirigidas a ti se responden en cuatro viñetas — o código completo, o una línea de test. Ojea, no leas. Ctrl+Shift+H lo oculta todo.' },
      ],
    },
    privacy: {
      kicker: 'Privacidad por construcción',
      title: 'El audio nunca toca tu disco',
      sub: 'Los fragmentos de audio van al motor de transcripción y se descartan en el acto — nunca se escribe un archivo de audio, ni siquiera temporal. Las llamadas van directas al proveedor que elijas. No hay servidor intermedio.',
      cards: [
        { t: 'Opción local, cero red', d: 'Whisper local + Ollama significa que nada sale de tu máquina. Tayori funciona completamente sin conexión.' },
        { t: 'Keys cifradas con DPAPI', d: 'Las API keys se guardan con safeStorage de Windows, atadas a tu cuenta. El renderer solo ve un booleano.' },
        { t: 'El historial está apagado por defecto', d: 'El historial de texto se puede apagar entero. Apagado, nada se escribe y la app solo escucha y olvida.' },
        { t: 'Consciente de inyección de prompts', d: 'Todo lo que la app lee — la otra persona, una captura, una oferta pegada — viaja marcado como material, nunca como órdenes.' },
      ],
    },
    providers: { kicker: 'Trae tu propio modelo', title: 'Cinco proveedores. O ninguno.' },
    download: {
      kicker: 'Consigue Tayori',
      title: 'Descarga y ejecuta — sin instalador',
      sub: 'Un ejecutable portable de Windows, unos 98 MB. Sin registro, sin clave de licencia. Descárgalo y listo.',
      cta: 'Descargar para Windows',
      version: 'última versión',
      reqTitle: 'Requisitos',
      req: ['Windows 10 v2004+ (Windows 11 recomendado)', 'Al menos una API key — o ninguna, con Ollama + Whisper', 'El binario no está firmado: SmartScreen avisará una vez → “Más información” → “Ejecutar de todas formas”'],
      alt: '¿Prefieres compilar desde el código?',
      altCta: 'Lee el README',
    },
    footer: {
      tagline: 'IA en tiempo real para reuniones y entrevistas. Open source, MIT, sin monetización.',
      madeBy: 'Creado por',
      cols: {
        product: 'Producto',
        resources: 'Recursos',
        productLinks: [
          { t: 'Funciones', href: '#features' },
          { t: 'Privacidad', href: '#privacy' },
          { t: 'Descargar', href: '#download' },
        ],
        resourceLinks: [
          { t: 'GitHub', href: 'https://github.com/cflarios/Tayori' },
          { t: 'README', href: 'https://github.com/cflarios/Tayori/blob/main/README.md' },
          { t: 'Arquitectura', href: 'https://github.com/cflarios/Tayori/blob/main/ARCHITECTURE.md' },
          { t: 'TayoriESP32', href: 'https://github.com/cflarios/TayoriESP32' },
        ],
      },
      legal: 'Tayori es una herramienta. Cómo y dónde la uses es tu responsabilidad — muchas empresas restringen los asistentes de IA en sus procesos, y las plataformas de evaluación técnica suelen prohibirlo explícitamente.',
    },
  },
}

export type Dict = (typeof dict)['en']

const LangContext = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: Dict }>({
  lang: 'en',
  setLang: () => {},
  t: dict.en,
})

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>(() => {
    const saved = typeof localStorage !== 'undefined' ? localStorage.getItem('tayori-lang') : null
    if (saved === 'en' || saved === 'es') return saved
    if (typeof navigator !== 'undefined' && navigator.language.toLowerCase().startsWith('es')) return 'es'
    return 'en'
  })

  useEffect(() => {
    localStorage.setItem('tayori-lang', lang)
    document.documentElement.lang = lang
  }, [lang])

  return <LangContext.Provider value={{ lang, setLang, t: dict[lang] }}>{children}</LangContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useI18n() {
  return useContext(LangContext)
}
