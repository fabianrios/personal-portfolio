// components/ConditionalContent.tsx
'use client'
import { Navbar, ThemeSwitch } from 'nextra-theme-blog'
import { usePathname } from 'next/navigation'

export function ConditionalContent({ pageMap, children }) {
    const pathname = usePathname()
    const isIndividualPost = pathname.startsWith('/posts/') && pathname !== '/posts'

    return (
        <>
            {!isIndividualPost && (
                <Navbar pageMap={pageMap}>
                    <ThemeSwitch />
                </Navbar>
            )}
            {children}
        </>
    )
}
