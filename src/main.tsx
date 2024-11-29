import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'

const app = document.getElementById('app')!

createRoot(app).render(
  <App />
);
