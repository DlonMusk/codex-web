import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './dataLayer/slices/userSlice';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import { useEffect } from 'react';
import { auth, db } from './firebase';
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';

function App() {

  const dispatch = useDispatch()

  const user = useSelector(selectUser)

  useEffect(() => {
    auth.onAuthStateChanged(userAuth => {
      if(userAuth) {
        getDoc(doc(db, "users", userAuth.uid)).then(doc => {
          if(doc.exists){
            const userData = doc.data()

            dispatch(login({
              uid: userAuth.uid,
              email: userAuth.email,
              username: userData.username,
              profilePhoto: userData.profilePhoto,
            }))
          }
          else {
            console.log("no document")
            dispatch(login({
              uid: userAuth.uid,
              email: userAuth.email
            }))
            
          }
        })
      } else {
        dispatch(logout())
      }
    })
  }, [dispatch])

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
