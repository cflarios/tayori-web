import { Hero } from './components/Hero'
import { Invisible, Features, HowItWorks, Privacy, Providers } from './components/Sections'
import { VanishDemo } from './components/VanishDemo'
import { Faq } from './components/Faq'
import { Download } from './components/Download'

export function Landing() {
  return (
    <main>
      <Hero />
      <Invisible />
      <VanishDemo />
      <Features />
      <HowItWorks />
      <Providers />
      <Privacy />
      <Faq />
      <Download />
    </main>
  )
}
