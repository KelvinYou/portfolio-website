import Navbar from '@/components/layout/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Footer from '@/components/layout/Footer'

const poppins = Poppins({ weight: "400", subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kelvin You | Software Engineer',
  description: 'Kelvin You - Software Engineer | Explore my portfolio, projects, and learn more about my expertise in web development and technology solutions. Connect with a passionate developer.',
  icons: {
    icon: '/logo.png',
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
