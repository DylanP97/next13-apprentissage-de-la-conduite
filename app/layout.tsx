import './styles/style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import type { Metadata } from 'next'
// import { Inter } from 'next/font/google'
import ClientOnly from './components/ClientOnly'
import ToasterProvider from '@/app/providers/ToasterProvider';

// const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Apprentissage de la Conduite et de la Sécurité Routière',
  description: 'Blog d\'apprentissage à l\'examen de conduite Alexandre Boitel',
  icons: {
    icon: './favicon.ico',
  },
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="fr-FR">
      <body suppressHydrationWarning={true}>
        <ClientOnly>
          <ToasterProvider />
        </ClientOnly>
        {children}
      </body>
    </html>
  )
}