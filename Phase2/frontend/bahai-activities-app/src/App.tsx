import { Route, Routes } from 'react-router-dom';

import './App.css'

import AdminLayout from './layauts/AdminLayout';
import PublicLayout from './layauts/PublicLayout';

import Event from './pages/admin/Event';
import AdminHome from './pages/admin/AdminHome';
import EventType from './pages/admin/EventType';
import GroupType from './pages/admin/GroupType';
import Individual from './pages/admin/Individual';
import GroupTypeDetail from './pages/admin/Group';
import PublicHome from './pages/public/PublicHome';
import Activities from './pages/admin/Activities';

function App() {
  
  return (
    <Routes>
      {/* Rutas publica con layout public */}
      <Route path='/' element={<PublicLayout />}>
        <Route index element={<PublicHome />} />
      </Route>
      {/* Rutas admin con layout admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminHome />} />
        <Route path="/admin/activities" element={<Activities />} />
        <Route path="/admin/group-types" element={<GroupType />} />
        <Route path="/admin/event-types/:id" element={<Event />} />
        <Route path="/admin/individuals" element={<Individual />} />
        <Route index path='/admin/event-types' element={<EventType />} />
        <Route path="/admin/group-types/:id" element={<GroupTypeDetail />} />
      </Route>
    </Routes>
  );
}

export default App
