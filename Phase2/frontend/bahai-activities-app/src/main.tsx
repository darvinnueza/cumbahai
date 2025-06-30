import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import 'primereact/resources/themes/lara-light-blue/theme.css';
// import 'primereact/resources/themes/lara-light-indigo/theme.css';
// import 'primereact/resources/themes/lara-light-purple/theme.css';
// import 'primereact/resources/themes/lara-light-teal/theme.css';
import 'primeicons/primeicons.css'; 
import 'primereact/resources/primereact.min.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

import './index.css'

import App from './App.tsx'
import Tailwind from 'primereact/passthrough/tailwind';

import { BrowserRouter } from 'react-router-dom';
import { PrimeReactProvider } from "primereact/api";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/cumbaya">
      <PrimeReactProvider value={{ pt: Tailwind }}>
        <App />
      </PrimeReactProvider>
    </BrowserRouter>
  </StrictMode>,
);