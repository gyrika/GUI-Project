import { computed, ref } from 'vue'

export type Theme = 'light' | 'dark'

const THEME_STORAGE_KEY = 'app-theme'
const theme = ref<Theme>('light')
let isThemeInitialized = false

function isTheme(value: unknown): value is Theme {
  return value === 'light' || value === 'dark'
}

function getPreferredTheme(): Theme {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)

  if (isTheme(storedTheme)) {
    return storedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

function applyTheme(nextTheme: Theme): void {
  theme.value = nextTheme

  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('dark', nextTheme === 'dark')
  }

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme)
  }
}

export function initializeTheme(): void {
  if (isThemeInitialized) {
    return
  }

  applyTheme(getPreferredTheme())
  isThemeInitialized = true
}

export function useTheme() {
  const isDark = computed(() => theme.value === 'dark')

  function toggleTheme(): void {
    applyTheme(theme.value === 'dark' ? 'light' : 'dark')
  }

  return {
    theme,
    isDark,
    toggleTheme,
    setTheme: applyTheme,
  }
}
