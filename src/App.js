import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Customerlist from './components/Customerlist';
import Traininglist from './components/Traininglist';
import TrainingCalendar from './components/TrainingCalendar';

function App() {
  
  return (
    <div className='App'>
      <BrowserRouter>
        <Link to='/'>Home</Link>{" "}
        <Link to='/customers'>Customers</Link>{" "}
        <Link to='/trainings'>Trainings</Link>{" "}
        <Link to='/calendar'>Training Calendar</Link>{" "}

        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/customers' element={<Customerlist />} />
          <Route path='/trainings' element={<Traininglist />} />
          <Route path='/calendar' element={<TrainingCalendar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
