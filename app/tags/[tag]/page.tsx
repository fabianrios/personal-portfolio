// app/tags/[tag]/page.tsx
import { getPageMap } from 'nextra/page-map'
import type { PageMapItem, MdxFile, Folder } from 'nextra'

interface PostWithMeta {
    slug: string
    route: string
    href: string
    title?: string
    date?: string
    description?: string
    tag?: string
    [key: string]: any
}

export async function generateStaticParams() {
    const pageMap = await getPageMap()
    const postsSection = pageMap.find((item: PageMapItem) => {
        return 'name' in item && item.name === 'posts'
    }) as Folder<MdxFile>

    if (!postsSection?.children) return []

    const allTags = new Set<string>()
    postsSection.children.forEach((child: MdxFile) => {
        if (child.frontMatter?.tag) {
            child.frontMatter.tag.split(',').forEach((tag: string) => {
                const cleanTag = tag.trim().toLowerCase().replace(/\s+/g, '-')
                allTags.add(cleanTag)
            })
        }
    })

    return Array.from(allTags).map(tag => ({ tag }))
}

export default async function TagPage({ params }: { params: Promise<{ tag: string }> }) {
    const { tag } = await params
    const pageMap = await getPageMap()
    const postsSection = pageMap.find((item: PageMapItem) => {
        return 'name' in item && item.name === 'posts'
    }) as Folder<MdxFile>

    if (!postsSection?.children) {
        return <div>No posts found</div>
    }

    const filteredPosts: PostWithMeta[] = postsSection.children
        .filter((child: MdxFile) => {
            if (!child.frontMatter?.tag) return false
            const tags = child.frontMatter.tag.split(',').map((t: string) =>
                t.trim().toLowerCase().replace(/\s+/g, '-')
            )
            return tags.includes(tag)
        })
        .map((child: MdxFile): PostWithMeta => ({
            slug: child.name,
            route: child.route,
            href: child.route,
            title: child.frontMatter?.title || child.name,
            date: child.frontMatter?.date,
            description: child.frontMatter?.description,
            tag: child.frontMatter?.tag,
            ...child.frontMatter
        }))

    filteredPosts.sort((a, b) => {
        const dateA = new Date(a.date || '1970-01-01')
        const dateB = new Date(b.date || '1970-01-01')
        return dateB.getTime() - dateA.getTime()
    })

    const displayTag = tag.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())

    return (
        <div>
            <div className="tag-header">
                <a href="/posts" className="back-button">← Back to Posts</a>
                <h1>Posts tagged with "{displayTag}"</h1>
                <p>{filteredPosts.length} post{filteredPosts.length !== 1 ? 's' : ''} found</p>
            </div>

            <div className="posts-list">
                {filteredPosts.map((post) => (
                    <div key={post.slug} className="post-item">
                        <h3 className="post-title">
                            <a href={post.href} className="post-link">
                                {post.title}
                            </a>
                        </h3>

                        <p className="post-description">
                            {post.description || 'No description available'} {' '}
                            <a href={post.href} className="read-more-link">
                                Read More →
                            </a>
                        </p>

                        {post.date && (
                            <p className="post-date">
                                {new Date(post.date).toLocaleDateString('en-US', {
                                    weekday: 'short',
                                    month: 'short',
                                    day: '2-digit',
                                    year: 'numeric'
                                })}
                            </p>
                        )}
                    </div>
                ))}
            </div>

            {filteredPosts.length === 0 && (
                <div className="no-posts">
                    <p>No posts found with tag "{displayTag}"</p>
                    <a href="/posts">Browse all posts</a>
                </div>
            )}
        </div>
    )
}
