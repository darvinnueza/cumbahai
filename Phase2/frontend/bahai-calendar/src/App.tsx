import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import PublicPage from './pages/PublicPage';
import AdminPage from './pages/AdminPage';
import EventManagementPage from './pages/EventTypeDetailPage';
import EventTypePage from './pages/EventTypePage';
import IndividualManagementPage from './pages/IndividualPage';
import FamilyManagementPage from './pages/FamilyPage';
import EventTypeDetailPage from './pages/EventTypeDetailPage';

import 'react-big-calendar/lib/css/react-big-calendar.css';


function App() {

  return (
    <Router basename="/cumbahai">
      <Routes>
        <Route path="/" element={<PublicPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/admin/events" element={<EventManagementPage />} />
        <Route path='/admin/event-types' element={<EventTypePage />} />
        <Route path='/admin/individuals' element={<IndividualManagementPage />} />
        <Route path='/admin/families' element={<FamilyManagementPage />} />
        <Route path="/admin/event-type-details/:id" element={<EventTypeDetailPage />} />
      </Routes>
    </Router>
  )
}

export default App;