import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import  Signup from './Signup2';
import Header from './Header';
import Login from './Login';
import Trackers from './Trackers';
import { AuthProvider } from '../context/AuthContext';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PrivateRoute from '../components/PrivateRoute'

function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Header />
            <Routes>
              <Route exact path="/" 
                element={
                  <PrivateRoute>
                    <Login />
                  </PrivateRoute> 
                } 
              />
              <Route exact path="/trackers" element={<Trackers />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App;
