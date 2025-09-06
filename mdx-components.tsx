// mdx-components.tsx
import type { MDXComponents } from 'mdx/types'
import { useMDXComponents as getBlogMDXComponents } from 'nextra-theme-blog'
import { YearDate } from './components/yearDate.js'
import { TechStack } from './components/TechStack'
import { ProjectShowcase } from './components/ProjectShowcase'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        ...getBlogMDXComponents(),
        YearDate,
        TechStack,
        ProjectShowcase,
        ...components,
    }
}
