// app/layout.tsx
import { Footer, Layout, Navbar, ThemeSwitch } from 'nextra-theme-blog'
import { Head } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { ConditionalContent } from '../components/ConditionalContent'
import 'nextra-theme-blog/style.css'
import '../styles/main.css'

export const metadata = {
    title: 'personal portfolio Fabián Ríos',
    description:
        'Basic info, blog and images from Fabián Ríos independent software developer',
    openGraph: {
        title: 'personal portfolio Fabián Ríos',
        description:
            'Basic info, blog and images from Fabián Ríos independent software developer',
        url: 'https://fabianrios.co',
        siteName: 'personal portfolio Fabián Ríos',
        images: [
            {
                url: 'https://fabianrios.s3.us-west-2.amazonaws.com/website-portfolio.jpg',
                width: 1200,
                height: 630,
                alt: 'personal portfolio preview',
            },
        ],
        locale: 'en_US',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        site: '@fabianriosarias',
        title: 'personal portfolio Fabián Ríos',
        description:
            'Basic info, blog and images from Fabián Ríos independent software developer',
        images: [
            'https://fabianrios.s3.us-west-2.amazonaws.com/website-portfolio.jpg',
        ],
    },
    robots: {
        index: true,
        follow: true,
    },
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
    const pageMap = await getPageMap()

    return (
        <html lang="en" suppressHydrationWarning>
        <Head />
        <body>
        <Layout>
            <ConditionalContent pageMap={pageMap}>
                {children}
            </ConditionalContent>
            <Footer>© 2025 Fabián Ríos</Footer>
        </Layout>
        </body>
        </html>
    )
}
