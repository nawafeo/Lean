import React from 'react';
import './App.css';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';
import ResetPage from './components/Structure/ResetPage';
import Sex from './components/Content/Sex';
import Age from './components/Content/Age';
import Weight from './components/Content/Weight';
import Height from './components/Content/Height';
import BFP from './components/Content/BFP';
import Activity from './components/Content/Activity';
import Person from './components/Content/Person';
import HealthInfo from './components/Content/HealthInfo';
import Register from './components/Register';
import Login from './components/Login';
import Profile from './components/Profile';
import Diet from './components/Content/Diet';
import DietGoal from './components/Content/DietGoal';
import DietInfo from './components/Content/DietInfo';
import DietProtein from './components/Content/DietProtein';
import Fitness from './components/Content/Fitness';
import FitnessGoal from './components/Content/FitnessGoal';
import FitnessInfo from './components/Content/FitnessInfo';
import FitnessLevel from './components/Content/FitnessLevel';
import FitnessEquipment from './components/Content/FitnessEquipment';
import PrivateRoute from './components/Structure/PrivateRoute';

function App() {

    (function() {
        if (localStorage.getItem('member') != null) {
            const expirationDuration = 1000 * 60 * 60 * 12; // 12 hours
            const timestamp = localStorage.getItem('timestamp');
            const currentTime = new Date().getTime();
            const timestampExpired = timestamp != null && currentTime - Number(timestamp) > expirationDuration;

            if (timestampExpired) {
                localStorage.removeItem('member');
                localStorage.setItem('timestamp', String(currentTime));
            }
        }
    })();

    return (
        <Router>
            <ResetPage />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/about' element={<About />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/info/sex' element={<Sex />} />
                <Route path='/info/age' element={<Age />} />
                <Route path='/info/weight' element={<Weight />} />
                <Route path='/info/height' element={<Height />} />
                <Route path='/info/BFP' element={<BFP />} />
                <Route path='/info/activity' element={<Activity />} />
                <Route path='/info' element={<Person />} />
                <Route path='/info/submit' element={<HealthInfo />} />
                <Route path='/register' element={<PrivateRoute><Register /></PrivateRoute>} />
                <Route path='/login' element={<PrivateRoute><Login /></PrivateRoute>} />
                <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
                <Route path='/diet' element={<Diet />} />
                <Route path='/diet/goal' element={<DietGoal />} />
                <Route path='/diet/info' element={<DietInfo />} />
                <Route path='/diet/protein' element={<DietProtein />} />
                <Route path='/fitness' element={<Fitness />} />
                <Route path='/fitness/goal' element={<FitnessGoal />} />
                <Route path='/fitness/level' element={<FitnessLevel />} />
                <Route path='/fitness/equipment' element={<FitnessEquipment />} />
                <Route path='/fitness/info' element={<FitnessInfo />} />
            </Routes>
        </Router>
    );
}

export default App;
