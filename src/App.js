import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from './dataLayer/slices/userSlice';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';

function App() {

  const user = useSelector(selectUser)

  return (
    <div className="">
      <Router>
        {!user ? (
          <LoginScreen/>
        ) : (
          <Routes>
            <Route path='/' element={<HomeScreen />}/>
          </Routes>
        )}
      </Router>
    </div>
  );
}

export default App;
