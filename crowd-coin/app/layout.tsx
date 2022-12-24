import 'semantic-ui-css/semantic.min.css'

import { Header, Container } from './components'

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <head />
      <body>
        <Container>
          <Header />
          {children}
        </Container>
      </body>
    </html>
  )
}
