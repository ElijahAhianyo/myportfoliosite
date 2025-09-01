import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { initializeTheme } from './lib/theme-init'

// Initialize theme immediately to prevent flash of unstyled content
initializeTheme();

createRoot(document.getElementById("root")!).render(<App />);
