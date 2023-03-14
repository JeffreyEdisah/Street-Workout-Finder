import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 

// Components
import MapComponent from './components/MapComponent';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import LocationDescription from './pages/LocationDescription'
import { Provider } from 'react-redux';
import { store } from './app/store';
import MenuComponent from './components/MenuComponent'

const settingsItems = ['Account', 'Preferences', 'Security', 'Edit Profile', 'Logout'];

function App() {
  return (
    <>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<div><div className='map_box'><MapComponent /></div> <div className='menu_box'> <MenuComponent  menuItems={settingsItems} /> </div></div>}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/logout' element={<Logout />}/>
<<<<<<< Updated upstream
          <Route path='/menu' element={<MenuComponent  menuItems={settingsItems} /> }/>
          <Route path='/location' element={<LocationDescription />}/>
=======
>>>>>>> Stashed changes
        </Routes>
      </Router>
    </Provider>
    </>
  );
}

export default App;
