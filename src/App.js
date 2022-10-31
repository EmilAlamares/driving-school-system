import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from './pages/Login'
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/'>
            <Route path='login' element={<Login />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
