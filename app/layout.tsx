import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'GD Real Estate Manager',
  description: 'CRM inmobiliario para gestión de propiedades, clientes y seguimientos.'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  )
}
