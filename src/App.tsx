import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { Landing } from './Landing'
import { DocsPage } from './docs/DocsPage'
import { useRoute } from './router'

export default function App() {
  const { path } = useRoute()
  const isDocs = path.startsWith('/docs')

  return (
    <>
      <div className="page-glow" />
      <Nav />
      {/* Horizontal-overflow containment lives here, NOT on <body>, so it never
          clips the fixed nav on scroll. */}
      <div className="overflow-x-clip">
        {isDocs ? <DocsPage /> : <Landing />}
        <Footer />
      </div>
    </>
  )
}
