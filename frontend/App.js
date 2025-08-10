// App.js
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Login from './Login';
import Register from './Register';
import ProductList from './components/ProductList';



function App() {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <div className="App">
        <h1>Welcome To 🛒 E-Commerce Application</h1>
        
          {user && (
    <div style={{ float: "right", marginRight: "20px", display: "flex", alignItems: "center", gap: "10px" }}>
      <span>👤 {user.username || user.email}</span>
      <button 
        onClick={() => {
          setUser(null);
          localStorage.removeItem("username");
        }} 
        style={{
          padding: "4px 10px",
          backgroundColor: "#f44336",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer"
        }}
      >
        Logout
      </button>
    </div>
  )}


        <Routes>
          <Route 
            path="/login" 
            element={user ? <Navigate to="/" /> : <Login setUser={setUser} />} 
          />
          <Route 
            path="/register" 
            element={user ? <Navigate to="/" /> : <Register />} 
          />
          <Route 
            path="/" 
            element={user ? <ProductList user={user} /> : <Navigate to="/login" />} 
          />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </div>
  
    </Router>
  );

  
}

export default App;
