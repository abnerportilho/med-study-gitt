import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import ErrorBoundary from './ErrorBoundary.tsx';
import './index.css';

// Depois de um deploy, uma aba aberta pode pedir arquivos (capítulos, leitor de PDF) da versão
// anterior que não existem mais: recarrega uma vez para pegar a versão nova.
window.addEventListener('vite:preloadError', (event) => {
  const KEY = 'reloaded-after-deploy';
  try {
    if (sessionStorage.getItem(KEY)) return;
    sessionStorage.setItem(KEY, '1');
  } catch {
    return;
  }
  event.preventDefault();
  window.location.reload();
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
