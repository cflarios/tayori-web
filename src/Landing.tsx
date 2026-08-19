import { Hero } from './components/Hero'
import { ShareDemo } from './components/ShareDemo'
import { Providers } from './components/Providers'
import { Ledger } from './components/Ledger'
import { Bento } from './components/Bento'
import { HowItWorks } from './components/HowItWorks'
import { Privacy } from './components/Privacy'
import { Faq } from './components/Faq'
import { Download } from './components/Download'

/**
 * Option B, in marketing-page order: the offer once, the demo that proves it,
 * providers, the honest ledger, capabilities, how it works, privacy, FAQ, and
 * one closing CTA. The primary action is the same button throughout.
 */
export function Landing() {
  return (
    <main>
      <Hero />
      <ShareDemo />
      <Providers />
      <Ledger />
      <Bento />
      <HowItWorks />
      <Privacy />
      <Faq />
      <Download />
    </main>
  )
}
