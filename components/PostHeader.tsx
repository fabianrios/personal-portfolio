// components/PostHeader.tsx
export function PostHeader({ postMeta }) {
  return (
    <div className="post-header">
      <a href="/posts" className="back-button">
        ← Back
      </a>
      {postMeta && (
        <div className="post-meta">
          <h1 className="post-title">{postMeta.title}</h1>
          {postMeta.date && (
            <p className="post-date">
              {new Date(postMeta.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          )}
          {postMeta.tag && (
            <div className="post-tags">
              {postMeta.tag.split(',').map((tag, index) => (
                <a
                  key={index}
                  href={`/tags/${tag.trim().toLowerCase().replace(/\s+/g, '-')}`}
                  className="post-tag"
                >
                  {tag.trim()}
                </a>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
