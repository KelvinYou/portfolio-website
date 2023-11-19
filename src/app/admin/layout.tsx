import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kelvin You | Admin',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className='bg-white min-h-screen'>
      {children}
    </div>
  )
}
