import { getStoredTheme, applyTheme } from "./theme";

// This script runs immediately to prevent flash of unstyled content
export function initializeTheme() {
  const theme = getStoredTheme();
  applyTheme(theme);
}
