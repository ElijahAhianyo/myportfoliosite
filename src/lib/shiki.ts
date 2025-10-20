import { createHighlighter, type BundledLanguage, type BundledTheme } from 'shiki'

let highlighterPromise: ReturnType<typeof createHighlighter> | null = null

export async function getHighlighter(theme: 'light' | 'dark') {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: ['one-light', 'one-dark-pro', "andromeeda"] as BundledTheme[],
      langs: [
        'javascript', 'typescript', 'tsx', 'jsx', 'json', 'bash', 'shell',
        'html', 'css', 'scss', 'python', 'go', 'rust', 'sql', 'markdown',
        'yaml', 'toml', 'java', 'c', 'cpp'
      ] as BundledLanguage[],
    })
  }
  const highlighter = await highlighterPromise
  return {
    highlighter,
    themeName: theme === 'dark' ? 'andromeeda' : 'one-light',
  }
}

export async function highlightToHtml(code: string, lang: string | undefined, theme: 'light' | 'dark') {
  const { highlighter, themeName } = await getHighlighter(theme)
  const language = (lang || 'txt').toLowerCase()
  try {
    return highlighter.codeToHtml(code, { lang: language as BundledLanguage, theme: themeName as BundledTheme })
  } catch {
    return highlighter.codeToHtml(code, { lang: 'txt', theme: themeName as BundledTheme })
  }
}
