// src/keycloak.ts
import Keycloak from 'keycloak-js';

const keycloak = new Keycloak({
    url: 'http://localhost:8080/auth',
    realm: 'bahai-cumbaya',
    clientId: 'calendar-activities',
});

export default keycloak;