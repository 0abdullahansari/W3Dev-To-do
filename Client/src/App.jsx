// import { useEffect, useState } from 'react';
// import './App.css';
// import Tasks from './components/Tasks/Tasks';
// import Signin from './components/Signin/Signin'
// import axios from 'axios';

// function App() {
//   const [loading,setIsLoading] = useState(false);
//   const [user, setUser] = useState(null);
//   useEffect(()=>{
//     const initial = async ()=> {
//       const getData = await axios.get("http://localhost:8080",{
//         withCredentials: true,
//         credentials:true
//       }).then(res=> res?.data);
//       setIsLoading(false);
//       if(getData?.isError)
//         return; 
//       setUser(getData)    
//       console.log(getData);
//     }
//     setIsLoading(true);
//     initial();
   
//   },[])

//   return (
//     <>
//       {loading?"Loading..." : user ? < Tasks /> : <Signin onLogin={setUser}/>}
//     </>
//   );
// }

// export default App;


import { useEffect, useState } from "react";
import "./App.css";
import Tasks from "./components/Tasks/Tasks";
import Signin from "./components/Signin/Signin";
import axios from "axios";
import Loading from "./components/Loading/Loading";
import { useStateValue } from "./StateProvider";

function App() {
  const [processing, setProcessing] = useState(false);
  // const [loading,setIsLoading] = useState(false);
  // const [user, setUser] = useState(null);
  const {state, dispatch} = useStateValue();
  // useEffect(()=>{
  //   const initial = async ()=> {
  //     const getData = await axios.get("http://localhost:8080",{
  //       withCredentials: true,
  //       credentials:true
  //     }).then(res=> res?.data);
  //     setIsLoading(false);
  //     if(getData?.isError)
  //       return;
  //     setUser(getData)
  //     console.log(getData);
  //   }
  //   setIsLoading(true);
  //   initial();

  // },[])

  useEffect(() => {
    const initial = async () => {
      console.log('UE running')
      console.log(processing);
      const getData = await axios
        .get("http://localhost:8080", {
          withCredentials: true,
          credentials: 'include',
        })
        .then((res) => res?.data);
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
      {/* {loading?"Loading..." : user ? < Tasks /> : <Signin onLogin={setUser}/>} */}
      {processing ? <Loading /> : state.email ? <Tasks /> : <Signin />}
    </>
  );
}

export default App;
