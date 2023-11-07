import Navbar from '@/components/layout/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Footer from '@/components/layout/Footer'

const poppins = Poppins({ weight: "400", subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kelvin You | Software Engineer',
  description: 'A personal website',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-primary`}>
        <Navbar />
        <div className='pt-20'>
          {children}

        </div>
        <Footer />
      </body>
    </html>
  )
}
