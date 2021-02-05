import React, { memo, useState, useEffect, useRef} from 'react'
import CurrencySelector from './CurrencySelector'
const App = () => {
    


    const [sourceCurrency, setSourceCurrency] = useState("sek");
    const [sourceValue, setSourceValue] = useState(100);

    const [targetCurrency, setTargetCurrency] = useState("eur")
    const [targetValue, setTargetValue] = useState(300);

    const [exchangeRate, setExchangeRate] = useState(3);



    const calculateExchange = () => {
        console.log("Calculating exchange...")
    }


    console.log("---BLYAT---\nsourceValue: ", sourceValue, "\ttargetValue: ", targetValue)
    
    useEffect(() => {
        console.log("targetValue useEffect >> ", targetValue);
    }, [targetValue]) 

    useEffect(() => {
        console.log("sourceValue useEffect >> ", sourceValue);
    }, [sourceValue])


    let amount = 0;


    const updateFromSource = (value) => {
        console.log("UPDATE FROM SOURCE >> ", value)
        setSourceValue(value)
        setTargetValue(value*exchangeRate)
    }

    const updateFromTarget = (value) => {
        console.log("UPDATE FROM TARGET >> ", value)
        setSourceValue(value/exchangeRate)
        setTargetValue(value)
    }


    return (
        <>
        {console.log("App > Render")}

    
        <h1>{sourceValue}</h1>
        <h1>{targetValue}</h1>

        <CurrencySelector key = "1" id = "A" value={sourceValue} currency={sourceCurrency} setCurrency={setSourceCurrency} setTargetValue={updateFromSource} />

        <CurrencySelector key = "2" id = "B" value={targetValue} currency={targetCurrency} setCurrency={setTargetCurrency} setTargetValue={updateFromTarget} />

        {/* <CurrencySelector currency={sourceCurrency} value={sourceValue} setCurrency={setSourceCurrency} setSelfValue={setSourceValue} setTargetValue={setTargetValue} key={1} refValue={refValue}/> */}

        {/* <CurrencySelector currency={targetCurrency} value={targetValue} setCurrency={setTargetCurrency} setSelfValue={setTargetValue} setTargetValue={setSourceValue} key={"wowa"}/> */}
        </>
    )
}

export default App




// import React, { useState, useCallback, useRef, useEffect } from "react";
// import { memo } from "react";

// // const useStaticState = val => {
// //   const [state, _setState] = useState(val);
// //   const setState = useRef(n => _setState(n));
// //   return [state, setState.current];
// // };

// export default function App() {
//   const [counter, setCounter] = useState(0);
//   //const [counter, setCounter] = useStaticState(0);
//   const incrementCounter = useCallback(() => {
//     setCounter(c => c + 1);
//   }, [setCounter]);

//   useEffect(() => {
//     console.log("increment changed!");
//   }, [incrementCounter]);

//   return (
//     <>
//       <CountValue counter={counter} />
//       <Button incrementCounter={incrementCounter} />
//     </>
//   );
// }

// const CountValue = ({ counter }) => {
//   return <div>Count value: {counter}</div>;
// };

// const Button = ({ incrementCounter }) => {
//   const renderCount = useRef(1);
//   console.log("button rendered: ", renderCount.current);
//   renderCount.current++;
//   return (
//       <>
//     {console.log("hmm")}
//   <button onClick={incrementCounter}>Increment</button>
//   </>
//   )
// };