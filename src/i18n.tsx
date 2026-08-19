import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export type Lang = 'en' | 'es'

/** Full bilingual copy for the landing. One object per language, same shape. */
export const dict = {
  en: {
    nav: { product: 'Product', privacy: 'Privacy', faq: 'FAQ', docs: 'Docs', download: 'Download', menu: 'Menu' },
    hero: {
      badge: 'Open source · GPL-3.0 · Runs on your machine',
      badgeShort: 'Open source · Runs on your machine',
      title: ['Your answer is already on screen.', 'Just not on theirs.'],
      sub: 'Tayori transcribes the call, works out who is asking, and drafts your answer in a floating overlay — one that Windows leaves out of the frame the moment you share your screen.',
      ctaDownload: 'Download for Windows',
      ctaGithub: 'View on GitHub',
      note: '98 MB portable · no account, no server, no telemetry',
    },
    demo: {
      toggle: 'Share your screen',
      hintOn: 'Your whole desktop is going out live — the overlay is not.',
      hintOff: 'Turn it on to see what lands in the call.',
      liveTag: 'Live demo — click the switch',
      yours: 'Your screen',
      yoursTag: 'Overlay on top',
      theirs: 'What everyone else sees',
      theirsTagOn: 'Nothing extra',
      theirsTagOff: 'Idle',
      bannerOn: 'You are sharing your screen',
      bannerOff: 'Not sharing',
      theirBanner: 'You are viewing the shared screen',
      noOverlay: 'No overlay in the captured frame',
      idle: ['Nothing shared yet.', 'Flip the switch to start sharing.'],
      you: 'You',
      other: 'Alex',
      listening: 'Listening',
      question: '“Tell me about a project you led end to end.”',
      suggested: 'Suggested answer',
      bullets: [
        'Billing migration to usage-based — I owned scoping.',
        'Three-phase rollout, zero downtime.',
        'Close with the outcome, not the rollout timeline.',
      ],
    },
    providers: { kicker: 'Bring your own model' },
    ledger: {
      kicker: 'The honest ledger',
      title: 'We would rather you hear the limits from us',
      body: 'Windows leaves the overlay out of anything that asks for a picture of your screen. It does nothing about a camera, a process list, or your own voice. Both halves of that are on this page.',
      hiddenTitle: 'Hidden from',
      hidden: ['Google Meet, Zoom, Teams, Discord', 'OBS “Display Capture” recorders', 'Windows Snipping Tool & app screenshots'],
      cantTitle: 'It can’t hide from',
      cant: ['A camera pointed at your screen', 'Proctoring that enumerates processes', 'Anything you read out loud'],
      note: 'The process name is cosmetic, not a rootkit.',
    },
    bento: {
      kicker: 'What it does',
      title: 'Everything happens on your machine, in the second you need it',
      sub: 'No bot joins the call. No recording is uploaded. No account exists to log into.',
      ears: {
        t: 'Two ears, not one',
        d: 'Your mic and the system audio are transcribed separately. Who said what is a fact, never a guess.',
      },
      transcribe: {
        t: 'Transcription, ~300 ms on Gemini Live',
        d: 'Or OpenAI, or Whisper running locally and fully offline. Feed it your CV and it stops mangling acronyms.',
      },
      teleprompter: {
        t: 'Teleprompter mode',
        d: 'One sentence per line, active line pinned. Your eyes barely move, so it doesn’t read as reading.',
      },
      solve: {
        kbd: 'Ctrl + Alt + C',
        t: 'Solve what’s on your screen',
        d: 'A vision model reads the screen on one keystroke — solve the code, answer the quiz, or explain the error and the logs.',
        comment: '// two-sum, O(n)',
      },
      stack: {
        kbd: 'Pick a stack',
        t: 'Cloud speed or total silence',
        d: 'Paste one API key, or skip keys entirely and run the whole thing offline.',
        cloud: 'Cloud',
        local: 'Fully local',
        rowTranscription: 'Transcription',
        rowAnswers: 'Answers',
        rowKeys: 'API keys needed',
        cloudTranscription: 'Gemini Live · ~300 ms',
        cloudAnswers: 'Claude · Gemini · GPT · DeepSeek',
        cloudKeys: 'One',
        localTranscription: 'Whisper, local',
        localAnswers: 'Ollama, local',
        localKeys: 'None',
        leavesLabel: 'Leaves your machine',
        leavesLocal: 'Nothing at all',
        leavesCloud: 'Only your prompt, direct to the provider',
      },
      phone: {
        t: 'Phone mirror',
        d: 'Serves answers to your phone over your own LAN — off the shared screen entirely. QR to pair, read-only.',
      },
      interpreter: {
        t: 'Interpreter mode',
        d: 'Speak one language, it renders the other — both directions, detecting each sentence by itself.',
      },
      speech: {
        t: 'Spoken answers',
        d: 'Free system voices, natural OpenAI voices, or local neural Piper. Auto-read, or one button per answer.',
      },
    },
    how: {
      kicker: 'How it works',
      title: 'Running in about two minutes',
      steps: [
        {
          n: '01',
          t: 'Pick a brain',
          d: 'Paste an API key for Claude, Gemini, ChatGPT or DeepSeek — or run fully local with Ollama + Whisper. A guided setup measures your machine and recommends models.',
        },
        {
          n: '02',
          t: 'Start listening',
          d: 'Hit Start. The meters move, the overlay sits top-right, and nothing touches disk unless you turn on history.',
        },
        {
          n: '03',
          t: 'Read the overlay',
          d: 'Questions aimed at you get answered in four tight bullets — or full code, or a quiz line. Glance, don’t read. Ctrl+Shift+H hides it all.',
        },
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
    faq: {
      kicker: 'Questions',
      title: 'The awkward ones, answered',
      items: [
        {
          q: 'Is this even legal to use?',
          a: 'Tayori is a tool; how you use it is on you. Many companies restrict AI assistants in hiring, and technical-assessment platforms often forbid them outright — some detect mass-paste even without seeing the window. Check what applies to your situation.',
        },
        {
          q: 'Can it be detected on a screen share?',
          a: 'The overlay won’t appear in Meet, Zoom, Teams, Discord or OBS — Windows excludes it from the captured frame. But it does not hide from a camera pointed at your screen, from proctoring software that enumerates processes, or from anything you read out loud.',
        },
        {
          q: 'Does my audio or data leave my machine?',
          a: 'The audio never touches your disk and no audio file is ever written. With Whisper local + Ollama, nothing leaves your machine at all. With a cloud provider, calls go straight to the provider you chose — there is no middle server. History is off by default.',
        },
        {
          q: 'Is there a Mac or Linux version?',
          a: 'Not yet. The invisibility relies on a Windows-specific capture-exclusion flag, so Tayori is Windows 10 (2004+) and Windows 11 only for now.',
        },
        {
          q: 'How much does it cost?',
          a: 'The app is free and open source (GPL-3.0), with no accounts and no monetization. You only pay your AI provider for usage — or nothing at all if you run fully local with Ollama + Whisper.',
        },
        {
          q: 'Do I need an API key?',
          a: 'For cloud models, yes — Anthropic, Google, OpenAI or DeepSeek. Or skip keys entirely and run local models with Ollama and Whisper. A guided setup measures your machine and recommends what to use.',
        },
      ],
    },
    cta: {
      title: 'One 98 MB file. No installer.',
      sub: 'Download it, run it, paste a key — or don’t, and go fully local. There is no sign-up and no license to lose.',
      ctaDownload: 'Download for Windows',
      ctaDocs: 'Read the docs',
      foot: 'Windows 10 v2004+ · Unsigned binary, SmartScreen warns once',
    },
    footer: {
      tagline: 'Real-time AI for meetings and interviews. Open source, GPL-3.0, no monetization.',
      nameOrigin: 'Japanese for “it became something you can rely on.” Hence the little ghost.',
      madeBy: 'Built by',
      cols: {
        product: 'Product',
        resources: 'Resources',
        productLinks: [
          { t: 'Features', href: '/#product' },
          { t: 'Docs', href: '/docs' },
          { t: 'Privacy', href: '/#privacy' },
          { t: 'Download', href: '/#download' },
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
    nav: { product: 'Producto', privacy: 'Privacidad', faq: 'FAQ', docs: 'Docs', download: 'Descargar', menu: 'Menú' },
    hero: {
      badge: 'Open source · GPL-3.0 · Corre en tu equipo',
      badgeShort: 'Open source · Corre en tu equipo',
      title: ['Tu respuesta ya está en pantalla.', 'Solo que no en la suya.'],
      sub: 'Tayori transcribe la llamada, deduce quién pregunta y redacta tu respuesta en un overlay flotante — uno que Windows deja fuera del frame en cuanto compartes pantalla.',
      ctaDownload: 'Descargar para Windows',
      ctaGithub: 'Ver en GitHub',
      note: '98 MB portable · sin cuenta, sin servidor, sin telemetría',
    },
    demo: {
      toggle: 'Comparte tu pantalla',
      hintOn: 'Tu escritorio entero sale en directo — el overlay no.',
      hintOff: 'Actívalo para ver qué llega a la llamada.',
      liveTag: 'Demo en vivo — pulsa el interruptor',
      yours: 'Tu pantalla',
      yoursTag: 'Con el overlay encima',
      theirs: 'Lo que ve el resto',
      theirsTagOn: 'Nada de más',
      theirsTagOff: 'En reposo',
      bannerOn: 'Estás compartiendo tu pantalla',
      bannerOff: 'Sin compartir',
      theirBanner: 'Estás viendo la pantalla compartida',
      noOverlay: 'Ningún overlay en el frame capturado',
      idle: ['Todavía no compartes nada.', 'Mueve el interruptor para empezar.'],
      you: 'Tú',
      other: 'Alex',
      listening: 'Escuchando',
      question: '“Cuéntame un proyecto que hayas liderado de principio a fin.”',
      suggested: 'Respuesta sugerida',
      bullets: [
        'Migración de facturación a consumo — yo definí el alcance.',
        'Despliegue en tres fases, cero caídas.',
        'Cierra con el resultado, no con el calendario.',
      ],
    },
    providers: { kicker: 'Trae tu propio modelo' },
    ledger: {
      kicker: 'Las cuentas claras',
      title: 'Preferimos que los límites te los contemos nosotros',
      body: 'Windows deja el overlay fuera de todo lo que pida una foto de tu pantalla. No hace nada contra una cámara, una lista de procesos o tu propia voz. Las dos mitades están en esta página.',
      hiddenTitle: 'Oculto de',
      hidden: ['Google Meet, Zoom, Teams, Discord', 'Grabadores tipo OBS con «Display Capture»', 'Recortes de Windows y capturas de la app'],
      cantTitle: 'No puede esconderse de',
      cant: ['Una cámara apuntando a tu pantalla', 'Proctoring que enumera procesos', 'Lo que digas en voz alta'],
      note: 'El nombre del proceso es cosmético, no un rootkit.',
    },
    bento: {
      kicker: 'Qué hace',
      title: 'Todo ocurre en tu equipo, en el segundo en que lo necesitas',
      sub: 'Ningún bot entra en la llamada. No se sube ninguna grabación. No hay cuenta a la que entrar.',
      ears: {
        t: 'Dos oídos, no uno',
        d: 'Tu micro y el audio del sistema se transcriben por separado. Quién dijo qué es un dato, nunca una suposición.',
      },
      transcribe: {
        t: 'Transcripción, ~300 ms con Gemini Live',
        d: 'O con OpenAI, o con Whisper corriendo en local y sin conexión. Dale tu CV y deja de destrozar siglas.',
      },
      teleprompter: {
        t: 'Modo teleprompter',
        d: 'Una frase por línea, con la línea activa fija. Los ojos apenas se mueven, así que no parece que leas.',
      },
      solve: {
        kbd: 'Ctrl + Alt + C',
        t: 'Resuelve lo que haya en pantalla',
        d: 'Un modelo con visión lee la pantalla con una pulsación — resuelve el código, responde el test o explica el error y los logs.',
        comment: '// two-sum, O(n)',
      },
      stack: {
        kbd: 'Elige un stack',
        t: 'Velocidad en la nube o silencio total',
        d: 'Pega una API key, o sáltate las keys del todo y ejecútalo entero sin conexión.',
        cloud: 'Nube',
        local: '100% local',
        rowTranscription: 'Transcripción',
        rowAnswers: 'Respuestas',
        rowKeys: 'API keys necesarias',
        cloudTranscription: 'Gemini Live · ~300 ms',
        cloudAnswers: 'Claude · Gemini · GPT · DeepSeek',
        cloudKeys: 'Una',
        localTranscription: 'Whisper, local',
        localAnswers: 'Ollama, local',
        localKeys: 'Ninguna',
        leavesLabel: 'Sale de tu equipo',
        leavesLocal: 'Nada en absoluto',
        leavesCloud: 'Solo tu prompt, directo al proveedor',
      },
      phone: {
        t: 'Espejo en el móvil',
        d: 'Sirve las respuestas a tu teléfono por tu propia red — fuera de la pantalla compartida. QR para vincular, solo lectura.',
      },
      interpreter: {
        t: 'Modo intérprete',
        d: 'Habla en un idioma y lo pasa al otro — en los dos sentidos, detectando cada frase por su cuenta.',
      },
      speech: {
        t: 'Respuestas habladas',
        d: 'Voces del sistema gratis, voces naturales de OpenAI o Piper neural local. Automático, o un botón por respuesta.',
      },
    },
    how: {
      kicker: 'Cómo funciona',
      title: 'Funcionando en unos dos minutos',
      steps: [
        {
          n: '01',
          t: 'Elige un cerebro',
          d: 'Pega una API key de Claude, Gemini, ChatGPT o DeepSeek — o corre 100% local con Ollama + Whisper. Un asistente mide tu equipo y recomienda modelos.',
        },
        {
          n: '02',
          t: 'Empieza a escuchar',
          d: 'Pulsa Empezar. Los medidores se mueven, el overlay se sitúa arriba a la derecha, y nada toca el disco salvo que actives el historial.',
        },
        {
          n: '03',
          t: 'Lee el overlay',
          d: 'Las preguntas dirigidas a ti se responden en cuatro viñetas — o código completo, o una línea de test. Ojea, no leas. Ctrl+Shift+H lo oculta todo.',
        },
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
    faq: {
      kicker: 'Preguntas',
      title: 'Las incómodas, respondidas',
      items: [
        {
          q: '¿Esto es legal siquiera?',
          a: 'Tayori es una herramienta; cómo la uses es cosa tuya. Muchas empresas restringen los asistentes de IA en sus procesos, y las plataformas de evaluación técnica suelen prohibirlos — algunas detectan el pegado masivo aunque no vean la ventana. Comprueba qué aplica en tu caso.',
        },
        {
          q: '¿Se puede detectar al compartir pantalla?',
          a: 'El overlay no aparece en Meet, Zoom, Teams, Discord ni OBS — Windows lo excluye del frame capturado. Pero no te protege de una cámara apuntando a tu pantalla, de software de proctoring que enumere procesos, ni de lo que digas en voz alta.',
        },
        {
          q: '¿Mi audio o mis datos salen de mi equipo?',
          a: 'El audio nunca toca el disco y no se escribe ningún archivo de audio. Con Whisper local + Ollama no sale nada de tu máquina. Con un proveedor en la nube, las llamadas van directas al que elijas — no hay servidor intermedio. El historial está apagado por defecto.',
        },
        {
          q: '¿Hay versión para Mac o Linux?',
          a: 'Todavía no. La invisibilidad depende de un flag de exclusión de captura propio de Windows, así que por ahora Tayori es solo para Windows 10 (2004+) y Windows 11.',
        },
        {
          q: '¿Cuánto cuesta?',
          a: 'La app es gratis y open source (GPL-3.0), sin cuentas y sin monetización. Solo pagas a tu proveedor de IA por el uso — o nada, si corres todo local con Ollama + Whisper.',
        },
        {
          q: '¿Necesito una API key?',
          a: 'Para modelos en la nube, sí — Anthropic, Google, OpenAI o DeepSeek. O sáltate las keys y corre modelos locales con Ollama y Whisper. Un asistente mide tu equipo y te recomienda qué usar.',
        },
      ],
    },
    cta: {
      title: 'Un archivo de 98 MB. Sin instalador.',
      sub: 'Descárgalo, ejecútalo, pega una key — o no lo hagas y vete a local. No hay registro ni licencia que perder.',
      ctaDownload: 'Descargar para Windows',
      ctaDocs: 'Leer la documentación',
      foot: 'Windows 10 v2004+ · Binario sin firmar, SmartScreen avisa una vez',
    },
    footer: {
      tagline: 'IA en tiempo real para reuniones y entrevistas. Open source, GPL-3.0, sin monetización.',
      nameOrigin: 'japonés para “se volvió algo en lo que confiar.” De ahí el fantasmita.',
      madeBy: 'Creado por',
      cols: {
        product: 'Producto',
        resources: 'Recursos',
        productLinks: [
          { t: 'Funciones', href: '/#product' },
          { t: 'Docs', href: '/docs' },
          { t: 'Privacidad', href: '/#privacy' },
          { t: 'Descargar', href: '/#download' },
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
