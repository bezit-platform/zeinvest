import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ZE Invest – Investice do udržitelné budoucnosti',
  description: 'ZE Invest vyvíjí projekty větrné energie. Stabilní výnos, čistá energie, lokální přínos.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="cs">
      <head>
        <meta name="theme-color" content="#2f6f93" />
        <meta property="og:title" content="ZE Invest – Investice do udržitelné budoucnosti" />
        <meta property="og:description" content="Vítr pro stabilní a nezávislou budoucnost." />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1509395176047-4a66953fd231?q=80&w=1200&auto=format&fit=crop" />
      </head>
      <body>{children}</body>
    </html>
  )
}
