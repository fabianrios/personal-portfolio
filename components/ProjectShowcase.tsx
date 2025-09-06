// components/ProjectShowcase.tsx
import { getPageMap } from 'nextra/page-map'
import type { PageMapItem, MdxFile, Folder, MetaJsonFile } from 'nextra'

export async function ProjectShowcase({ folder = 'posts' }) {
    const pageMap = await getPageMap()

    // Find the posts section in the pageMap array
    const postsSection = pageMap.find((item: PageMapItem) => {
        return 'name' in item && item.name === folder
    }) as Folder<MdxFile>

    if (!postsSection || !postsSection.children) {
        return <div>No posts found</div>
    }

    // Extract posts from the children array, excluding the index page
    const posts = postsSection.children
        .filter((child: MdxFile) => child.name !== 'index' && child.frontMatter)
        .map((child: MdxFile) => ({
            slug: child.name,
            route: child.route,
            ...child.frontMatter,
            href: child.route
        }))

    // Sort by date (newest first)
    posts.sort((a, b) => {
        const dateA = new Date(a.date || '1970-01-01')
        const dateB = new Date(b.date || '1970-01-01')
        return dateB - dateA
    })

    return (
        <div className="posts-list">
            {posts.map((post) => (
                <div key={post.slug} className="post-item">
                    <h3 className="post-title">
                        <a href={post.href} className="post-link">
                            {post.title}
                        </a>
                    </h3>

                    <p className="post-description">
                        {post.description} {' '}
                        <a href={post.href} className="read-more-link">
                            Read More →
                        </a>
                    </p>

                    <p className="post-date">
                        {new Date(post.date).toLocaleDateString('en-US', {
                            weekday: 'short',
                            month: 'short',
                            day: '2-digit',
                            year: 'numeric'
                        })}
                    </p>
                </div>
            ))}
        </div>
    )
}
