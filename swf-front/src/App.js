import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 

// Components
import MapComponent from './components/MapComponent';
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import { Provider } from 'react-redux';
import { store } from './app/store';
import MenuComponent from './components/MenuComponent'

function App() {
  return (
    <>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<MapComponent />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/logout' element={<Logout />}/>
          <Route path='/menu' element={<MenuComponent />}/>
        </Routes>
      </Router>
    </Provider>
    </>
  );
}

export default App;
