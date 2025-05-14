import './App.css'

import Header from './components/Header'
import CustomCalendar from './components/Calendar';

function App() {

  return (
    <div className="bg-white min-h-screen rbc-date-cell font-medium">
      <Header />
      <CustomCalendar />
    </div>
  )
}

export default App
