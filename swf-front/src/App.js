import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom' 

// Components
import MapCompontentTest from './components/MapComponentTest'
import Login from './pages/Login';
import Register from './pages/Register';
import Logout from './pages/Logout';
import { Provider } from 'react-redux';
import { store } from './app/store'

function App() {
  return (
    <>
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/' element={<MapCompontentTest />}/>
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Register />}/>
          <Route path='/logout' element={<Logout />}/>
        </Routes>
      </Router>
    </Provider>
    </>
  );
}

export default App;
