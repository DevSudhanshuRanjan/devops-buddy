import { useState } from "react";

function Signup({ setIsLogin }) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, password })
    });

    const data = await res.json();
    alert(data.message);
    setIsLogin(true); // signup ke baad login page pe bhej do
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Signup</h2>

      <input placeholder="Name" onChange={(e) => setName(e.target.value)} /><br /><br />
      <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} /><br /><br />
      <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} /><br /><br />

      <button onClick={handleSignup}>Signup</button>
    </div>
  );
}

export default Signup;