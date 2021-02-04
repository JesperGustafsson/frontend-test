import React, { useState, useEffect, useRef} from 'react'

const App = () => {
    
    const CurrencySelector = ( {currency, value, setCurrency, setSelfValue, setTargetValue } ) => {
        


        const convertValues = (e) => {
            setSelfValue(e.target.value); 
        }


        return (

            <>
                {console.log("CurrencySelector > Render")}

                <div className="currencySelector">

                    <select defaultValue={currency} onChange={e => setCurrency(e.target.value)}name="currency" id="currency"> {/*Grab all currencies form fixer.io(?)*/}
                        <option value="usd">usd</option>
                        <option value="sek">sek</option>
                        <option value="yen">yen</option>
                        <option value="eur">eur</option>
                    </select>
                    
                </div>  

                <div className="currencyDisplay">

                    <input value={value} onChange = {e => convertValues(e)} type="text" name="textinputter"/>

                </div>
            </>
        )


    
    }



    const [sourceCurrency, setSourceCurrency] = useState("sek");
    const [sourceValue, setSourceValue] = useState(100);

    const [targetCurrency, setTargetCurrency] = useState("eur")
    const [targetValue, setTargetValue] = useState(300);

    const [exchangeRate, setExchangeRate] = useState(3);



    const calculateExchange = () => {
        console.log("Calculating exchange...")
    }

    useEffect(() => {
        console.log("sourceValue useEffect");
        setTargetValue(sourceValue*exchangeRate);
    }, [sourceValue])

    useEffect(() => {
        console.log("sourceValue useEffect");
        setSourceValue(targetValue/exchangeRate);
    }, [targetValue])

    return (
        <>
        {console.log("App > Render")}

        <CurrencySelector currency={sourceCurrency} value={sourceValue} setCurrency={setSourceCurrency} setSelfValue={setSourceValue} setTargetValue={setTargetValue} key={1}/>

        <CurrencySelector currency={targetCurrency} value={targetValue} setCurrency={setTargetCurrency} setSelfValue={setTargetValue} setTargetValue={setSourceValue} key={"wowa"}/>

        {/* <CurrencySelector currency={sourceCurrency} value={sourceValue} setCurrency={setSourceCurrency} setSelfValue={setSourceValue} setTargetValue={setTargetValue} key={1} refValue={refValue}/> */}

        {/* <CurrencySelector currency={targetCurrency} value={targetValue} setCurrency={setTargetCurrency} setSelfValue={setTargetValue} setTargetValue={setSourceValue} key={"wowa"}/> */}
        </>
    )
}

export default App


