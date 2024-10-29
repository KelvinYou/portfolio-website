import type { Metadata } from 'next'
import { Poppins, Encode_Sans } from 'next/font/google'
import Footer from '@/app/(user)/_components/Footer'
import ComputerView from './ComputerView'
import Header from '@/app/(user)/_components/Header'

// const poppins = Poppins({ weight: "400", subsets: ['latin'] })
const poppins = Encode_Sans({ weight: "400", subsets: ['latin'] })

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
    <div  className={`${poppins.className} bg-primary`}>
      <Header />

      <div className='flex flex-col min-h-[100vh]'>

        <div className='flex-grow'>
          <div className='h-full'>
            {children}

          </div>
          <Footer />
        </div>
        <ComputerView />

      </div>
    </div>
  )
}
