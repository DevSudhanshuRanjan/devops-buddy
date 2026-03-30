useEffect(() => {
  fetch("http://localhost:5000/api/message")
    .then(res => res.json())
    .then(data => console.log(data.message));
}, []);