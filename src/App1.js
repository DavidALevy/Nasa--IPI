import { useEffect, useState } from "react";
import Advice from './components/Advice'

const App = () => {
  const [adviceSlip, setAdviceSlip] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    error: false,
    message: "",
  });
  const handler = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.adviceslip.com/advice");
      console.log(response);
      if (response.status !== 200) {
        throw new Error("the error is...its messed up");
      }
      const data = await response.json();
      setAdviceSlip(data.slip);
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
      <h1>advice</h1>
      {loading ? (
        <p>loading...</p>
      ) : (
        <>
          <Advice advice={adviceSlip.advice} />
          <button onClick={handler}>get data</button>
        </>
      )}
    </div>
  );
};
export default App;