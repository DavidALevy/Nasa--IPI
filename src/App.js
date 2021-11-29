import './App.css' ;
import { useEffect, useState } from "react";
 

const App = () => {
  const [item, setitem] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  const handler = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY&count=1"
       );
      console.log(response);
      if (response.status !== 200) {
        throw new Error("too many requests");
      }
      const data = await response.json();
      setitem(data[0]);
      console.log("API info", data[0]);
      setLoading(false);
    } catch (e) {
      setError({ error: true, message: e.message });
    }
  };

  useEffect(() => {
    handler();
  }, []);

  if (error.error) {
    return <h1>{error.message}</h1>;
  }
  return (
    <div>
      <header className="title"><h1 >Nasa Photos</h1></header>
      {loading ? (
        <p>loading...</p>
      ) : (
        <div className='main'>
          <p>Image date: {item.date}</p>
          <p>{item.explanation}</p>
          <img src={item.hdurl}alt="astronomy"/>
          <p><button onClick={handler}>get new image</button></p>
        </div>
      )}
    </div>
  );
};
export default App;