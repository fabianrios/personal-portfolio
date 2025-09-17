// components/ConditionalContent.tsx
'use client'
import { Navbar, ThemeSwitch } from 'nextra-theme-blog'
import { Search } from 'nextra/components'
import { usePathname } from 'next/navigation'
import { ScrollToTop } from './ScrollToTop'

export function ConditionalContent({ pageMap, children }) {
    const pathname = usePathname()
    const isIndividualPost = pathname.startsWith('/posts/') && pathname !== '/posts'
    const showScrollToTop = pathname === '/posts' || pathname === '/projects' || isIndividualPost

    return (
        <>
            {!isIndividualPost && (
                <Navbar pageMap={pageMap}>
                    <Search />
                    <ThemeSwitch />
                </Navbar>
            )}
            {children}
            {showScrollToTop && <ScrollToTop />}
        </>
    )
}
