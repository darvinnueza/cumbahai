import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ReactKeycloakProvider } from '@react-keycloak/web'
import keycloak from './keycloak'

import { addLocale } from 'primereact/api';

// import 'primereact/resources/themes/lara-light-blue/theme.css';
// import 'primereact/resources/primereact.min.css';
// import 'primeicons/primeicons.css';

import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './styles/prime-overrides.css';

addLocale('es', {
  firstDayOfWeek: 1,
  dayNames: ['domingo','lunes','martes','miércoles','jueves','viernes','sábado'],
  dayNamesShort: ['dom','lun','mar','mié','jue','vie','sáb'],
  dayNamesMin: ['D','L','M','X','J','V','S'],
  monthNames: ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'],
  monthNamesShort: ['ene','feb','mar','abr','may','jun','jul','ago','sep','oct','nov','dic'],
  today: 'Hoy',
  clear: 'Limpiar',
  dateFormat: 'yy-mm-dd'
});

createRoot(document.getElementById('root')!).render(
  <ReactKeycloakProvider authClient={keycloak}>
    <App />
  </ReactKeycloakProvider>
)