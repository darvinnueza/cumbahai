import { useKeycloak } from '@react-keycloak/web';
import Header from '../components/Header';
import CustomCalendar from '../components/Calendar';
import Navbar from '../components/Navbar';

const AdminPage = () => {

    const { keycloak, initialized } = useKeycloak();

    if (!initialized) return <div>Loading...</div>;

    if (!keycloak.authenticated) {
        keycloak.login();
        return <div>Redirigiendo a Keycloak...</div>;
    }

    return (
        <div className="min-h-screen"> 
            <Header />
            <Navbar />
            <CustomCalendar />
        </div>
    )
}

export default AdminPage;