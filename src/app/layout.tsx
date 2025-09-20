import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Intervu',
  description: 'Master your next job interview with AI-powered practice, real-time feedback, and personalized coaching',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-blue-100">
          {children}
        </div>
      </body>
    </html>
  )
}

