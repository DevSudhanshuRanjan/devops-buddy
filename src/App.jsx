import { useState } from "react";
import Login from "./Login";
import Signup from "./Signup";

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );

  const [isLogin, setIsLogin] = useState(true);

  return (
    <>
      {isLoggedIn ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h1>Welcome to DevOps Buddy 🚀</h1>

          <button onClick={() => {
            localStorage.removeItem("token");
            setIsLoggedIn(false);
          }}>
            Logout
          </button>
        </div>
      ) : isLogin ? (
        <Login setIsLoggedIn={setIsLoggedIn} setIsLogin={setIsLogin} />
      ) : (
        <Signup setIsLogin={setIsLogin} />
      )}
    </>
  );
}

export default App;