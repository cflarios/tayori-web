import { Nav } from './components/Nav'
import { Hero } from './components/Hero'
import { Invisible, Features, HowItWorks, Privacy, Providers } from './components/Sections'
import { Download } from './components/Download'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <>
      <div className="aurora" />
      <Nav />
      <main>
        <Hero />
        <Invisible />
        <Features />
        <HowItWorks />
        <Providers />
        <Privacy />
        <Download />
      </main>
      <Footer />
    </>
  )
}
