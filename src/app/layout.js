import Header from '@/components/Header'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'To Do List',
  description: 'List of To Do',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-w-screen min-h-screen text-white`}>
        <Header/>
        {children}
        </body>
    </html>
  )
}
