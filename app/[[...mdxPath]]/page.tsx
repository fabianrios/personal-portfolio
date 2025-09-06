// app/[[...mdxPath]]/page.tsx
import { PostHeader } from '../../components/PostHeader'
import { importPage } from 'nextra/pages'
import { getPageMap } from 'nextra/page-map'
import { notFound } from 'next/navigation'
import type { PageMapItem, MdxFile, Folder, FrontMatter } from 'nextra'

export default async function Page({ params }: { params: Promise<{ mdxPath?: string[] }> }) {
    const resolvedParams = await params
    const mdxPath = resolvedParams.mdxPath || []

    // If this is a tag route, let the tag page handle it
    if (mdxPath[0] === 'tags') {
        notFound()
    }

    // Don't handle static assets
    if (mdxPath.some(segment =>
        segment?.startsWith('_next') ||
        segment?.startsWith('.well-known') ||
        segment?.includes('.png') ||
        segment?.includes('.jpg') ||
        segment?.includes('.gif') ||
        segment?.includes('.ico') ||
        segment?.includes('.css') ||
        segment?.includes('.js')
    )) {
        notFound()
    }

    // Check if this is an individual post and get metadata server-side
    const isIndividualPost = mdxPath.length > 0 && mdxPath[0] === 'posts' && mdxPath.length > 1
    let postMeta: FrontMatter | null = null

    if (isIndividualPost) {
        const pageMap = await getPageMap()
        const postsSection = pageMap.find((item: PageMapItem) => {
            return 'name' in item && item.name === 'posts'
        }) as Folder<MdxFile>

        const slug = mdxPath[1]

        if (postsSection?.children) {
            const post = postsSection.children.find((child: MdxFile) => child.name === slug)
            postMeta = post?.frontMatter || null
        }
    }

    try {
        const result = await importPage(mdxPath)
        const { default: Content, ...props } = result

        return (
            <>
                {isIndividualPost && <PostHeader postMeta={postMeta} />}
                <Content {...props} />
            </>
        )
    } catch (error) {
        console.error('Error loading page:', error)
        notFound()
    }
}
