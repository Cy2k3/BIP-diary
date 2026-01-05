import type React from "react"
import type { Metadata } from "next"
import { Space_Grotesk, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { DiaryProvider } from "@/lib/diary-context"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const _spaceGrotesk = Space_Grotesk({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Creative Learning Diary | BIP Gamification in Academia",
  description: "A game-log style diary for the Blended Intensive Program on Gamification in Academia",
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <DiaryProvider>{children}</DiaryProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
