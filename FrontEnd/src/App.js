import React from 'react';


import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Signup from "./Components/Signup"
import Home from "./Components/Home"
import Modal from 'react-modal'
import Calender from "./Components/Calender"
import ShowEvents from './Components/ShowEvents'

Modal.setAppElement('#root');



const App = () => {


  return (
    <><Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signups" element={<Signup />} />
        <Route path="/create-event" element={<Calender />} />
        <Route path="/appointments" element={<ShowEvents />} />

      </Routes>

    </>
  );
};

export default App;


// const [appo, setAppo] = useState([])

//   useEffect(() => {
//     axios.get('/api/calendar/appointments')
//       .then(data => setAppo(data)
//       )
//       .catch(err => console.log(err))
//   }, [])