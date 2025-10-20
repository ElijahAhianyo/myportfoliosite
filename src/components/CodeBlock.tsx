import React, { useEffect, useMemo, useState } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { highlightToHtml } from '@/lib/shiki'

interface CodeBlockProps {
  className?: string
  children?: React.ReactNode
}

export function CodeBlock({ className, children }: CodeBlockProps) {
  const { theme } = useTheme() // 'light' | 'dark' | 'system'
  const [html, setHtml] = useState<string>('')
  const [copied, setCopied] = useState(false)
  const codeText = useMemo(() => {
    if (typeof children === 'string') return children
    if (Array.isArray(children)) return children.join('')
    return ''
  }, [children])

  const langMatch = (className || '').match(/\blang-([A-Za-z0-9_-]+)\b/)
  const lang = langMatch ? langMatch[1].toLowerCase() : undefined

  useEffect(() => {
    let cancelled = false

    const resolveTheme = () => {
      if (theme === 'system') {
        if (typeof window !== 'undefined' && window.matchMedia) {
          return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        }
        // fallback if no window (shouldn't happen client-side)
        return 'light'
      }
      return theme === 'dark' ? 'dark' : 'light'
    }

    const doHighlight = async () => {
      const effective = resolveTheme()
      try {
        const h = await highlightToHtml(codeText, lang, effective)
        if (!cancelled) setHtml(h)
      } catch (err) {
        // optional: setHtml to raw escaped code or empty
        if (!cancelled) setHtml(`<pre><code>${escapeHtml(codeText)}</code></pre>`)
        console.error('shiki highlight error', err)
      }
    }

    doHighlight()

    // if theme === 'system', subscribe to OS theme changes so we can re-highlight if needed
    let mql: MediaQueryList | null = null
    const onChange = () => {
      // re-run highlight with new effective theme
      doHighlight()
    }
    if (theme === 'system' && typeof window !== 'undefined' && window.matchMedia) {
      mql = window.matchMedia('(prefers-color-scheme: dark)')
      // modern browsers:
    mql.addEventListener('change', onChange)
    }

    return () => {
      cancelled = true
      if (mql) {
        if (typeof mql.removeEventListener === 'function') mql.removeEventListener('change', onChange)
        else mql.removeListener(onChange)
      }
    }
  }, [codeText, lang, theme])

  // copy to clipboard handler
  const handleCopy = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(codeText)
      } else {
        // fallback
        const ta = document.createElement('textarea')
        ta.value = codeText
        ta.style.position = 'fixed'
        ta.style.opacity = '0'
        document.body.appendChild(ta)
        ta.select()
        document.execCommand('copy')
        document.body.removeChild(ta)
      }

      setCopied(true)
      window.setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('copy failed', err)
    }
  }

  return (
    <div className="my-4 relative overflow-x-auto rounded-lg border border-border">
      <button
        onClick={handleCopy}
        aria-label={copied ? 'Copied' : 'Copy code'}
        className="absolute right-2 top-2 z-10 inline-flex items-center gap-2 rounded px-2 py-1 text-xs font-medium transition-colors bg-muted/60 hover:bg-muted/80"
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}

/** tiny helper (use a proper escape in prod) */
function escapeHtml(s: string) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
