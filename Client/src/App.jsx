import { useEffect, useState } from "react";
import Tasks from "./components/Tasks/Tasks";
import Signin from "./components/Signin/Signin";
import axios from "axios";
import Loading from "./components/Loading/Loading";
import { useStateValue } from "./StateProvider";

function App() {
  const [processing, setProcessing] = useState(true);
  const {state, dispatch} = useStateValue();

  useEffect(() => {
    const initial = async () => {
      console.log('UE running')
      const getData = await axios
        .get("http://localhost:8080", {
          withCredentials: true,
          credentials: 'include',
        })
        .then((res) => res?.data);
        console.log("data : ", getData);
      setProcessing(false);
      if (getData)
      {
        console.log("UE dispatch running");
        dispatch({
          type: "INITIAL",
          state: getData,
        });}
        else return;
    };
    initial();
  }, []);

  return (
    <>
      {processing ? <Loading /> : state.email ? <Tasks /> : <Signin />}
    </>
  );
}

export default App;
