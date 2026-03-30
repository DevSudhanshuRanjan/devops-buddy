import { useEffect } from "react";

function App() {

  useEffect(() => {
    fetch("http://localhost:5000/api/message")
      .then(res => res.json())
      .then(data => console.log(data.message));
  }, []);

  return <h1>DevOps Buddy 🚀</h1>;
}

export default App;