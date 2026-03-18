import { copyFileSync, mkdirSync } from 'fs'

mkdirSync('dist', { recursive: true })
copyFileSync('landing.html', 'dist/index.html')
console.log('✅ Landing copiée → dist/index.html')