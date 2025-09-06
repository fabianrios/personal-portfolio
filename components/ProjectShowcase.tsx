// components/ProjectShowcase.tsx
import { getPageMap } from 'nextra/page-map'

export async function ProjectShowcase({ folder = 'posts' }) {
    const pageMap = await getPageMap()

    const postsSection = pageMap.find(item => item.name === folder)

    if (!postsSection || !postsSection.children) {
        return <div>No posts found</div>
    }

    const posts = postsSection.children
        .filter(child => child.name !== 'index' && child.frontMatter)
        .map(child => ({
            slug: child.name,
            route: child.route,
            ...child.frontMatter,
            href: child.route
        }))

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
                    </p>
                    <a href={post.href} className="read-more-link">
                        Read More →
                    </a>

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
