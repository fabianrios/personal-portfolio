// next.config.js
import nextra from 'nextra'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const withNextra = nextra({})

export default withNextra({
    outputFileTracingRoot: __dirname,
})
