import Navbar from '@/components/layout/user/Navbar'
import './../globals.css'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Footer from '@/components/layout/user/Footer'
import ComputerView from './ComputerView'

const poppins = Poppins({ weight: "400", subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kelvin You | Software Engineer',
  description: 'Kelvin You - Software Engineer | Explore my portfolio, projects, and learn more about my expertise in web development and technology solutions. Connect with a passionate developer.',
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


        <div className='pt-20 relative'>

          <div>
            {children}
            <Footer />
          </div>
          
          <ComputerView />

        </div>
      </body>
    </html>
  )
}
