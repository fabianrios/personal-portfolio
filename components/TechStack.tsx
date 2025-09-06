export function TechStack({ technologies }) {
    return (
        <div className="flex flex-wrap gap-2">
            {technologies.map(tech => (
                <span key={tech} className="bg-blue-100 px-2 py-1 rounded">
          {tech}
        </span>
            ))}
        </div>
    )
}
