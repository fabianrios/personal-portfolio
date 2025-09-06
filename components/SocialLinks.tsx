// components/SocialLinks.tsx
const socialLinks = [
    { platform: 'Twitter', handle: '@fabianriosarias', url: 'https://twitter.com/fabianriosarias' },
    { platform: 'GitHub', handle: '@fabianrios', url: 'https://github.com/fabianrios' },
    { platform: 'Instagram', handle: '@fabian_rios', url: 'https://instagram.com/fabian_rios' },
    { platform: 'Email', handle: 'hi@fabianrios.co', url: 'mailto:hi@fabianrios.co' }
]

export function SocialLinks() {
    return (
        <div className="social-links">
            <h3>Connect</h3>
            <ul>
                {socialLinks.map(link => (
                    <li key={link.platform}>
                        <a href={link.url} target="_blank" rel="noopener noreferrer">
                            {link.platform} {link.handle}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
