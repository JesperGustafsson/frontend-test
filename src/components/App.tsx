import React, { useState, useEffect } from 'react';
import CurrencySelector from './CurrencySelector';
import styled from 'styled-components';

    // API KEY: 4babd9e1aa4a8bf230ae79e747643be7 fixer.io
    // API KEY: 87b4f9fb2be631bed0c8 currcon


const App = () => {

    const [currencyData, setCurrencyData] = useState([{SEK: {
      currencyName: "Swedish Krona",
      currencySymbol: "kr"
    }}])
    const [currencyOrder, setCurrencyOrder] = useState([["SEK"],["Swedish Krona"]])

    const [errorMessage, setErrorMessage] = useState()

    const getCurrencies = () => {

      fetch(`https://free.currconv.com/api/v7/currencies?&apiKey=87b4f9fb2be631bed0c8`).then(response => response.json()).then(data => {
        const json = data;

        let currencyOrderID : Array<Array<string>> = []; 
        let currencyOrderName : string[][] = []; 
          
        //Getting all the keys, turning into an array to be able to sort.
        const keyOrder : Array<string> = Object.keys(json.results).sort();
  
        //Sorting based on NAME of currency
        for (var key in keyOrder) {
          const currencyName : string = json.results[keyOrder[key]].currencyName
          currencyOrderID.push([keyOrder[key], currencyName]);
        }
        currencyOrderName = [...currencyOrderID].sort((a, b) =>  a[1].localeCompare(b[1]));
        
  
         setCurrencyData(json.results);
         // setCurrencyOrder(currencyOrderID);
         setCurrencyOrder(currencyOrderName);
    });


    } 

    // async/await function of the above, gives a "Uncaught ReferenceError: regeneratorRuntime is not defined" error
  /*  const getCurrencies = async () => {

      const result = await fetch(`https://free.currconv.com/api/v7/currencies?&apiKey=87b4f9fb2be631bed0c8`);
      let json;
      let currencyOrderID = []; 
      let currencyOrderName = []; 

      if (result) {
        json = await result.json();
        
        //Getting all the keys, turning into an array to be able to sort.
        const keyOrder = Object.keys(json.results).sort();

        //Sorting based on NAME of currency
        for (var key in keyOrder) {
          let newCurrencyName = json.results.[keyOrder[key]].currencyName
          currencyOrderID.push([keyOrder[key], newCurrencyName]);
        }
        currencyOrderName = [...currencyOrderID].sort((a, b) =>  a[1].localeCompare(b[1]));
      }

       setCurrencyData(json.results);
       //setCurrencyOrder(currencyOrderID);
       setCurrencyOrder(currencyOrderName);

    } */

      //Is called once when the page is loaded, fetching currencies (ID, name, symbol)
    useEffect(() => {
      getCurrencies();
    }, [])

    const [sourceCurrency, setSourceCurrency] = useState("SEK");
    const [sourceValue, setSourceValue] = useState(1);

    const [targetCurrency, setTargetCurrency] = useState("EUR")
    const [targetValue, setTargetValue] = useState(0.1);

    const [exchangeRate, setExchangeRate] = useState(0.1); //Exchange rate from source to target currency

    //Fetches adn sets the current exchangerate when either currency is updated
    useEffect(() => {
        calculateExchange();
    }, [sourceCurrency, targetCurrency])


    const calculateExchange = () => {
        
      fetch(`https://free.currconv.com/api/v7/convert?q=${sourceCurrency}_${targetCurrency}&compact=ultra&apiKey=87b4f9fb2be631bed0c8`).then(response => response.json()
      .then(json => {

        const newExchange = (json[`${sourceCurrency}_${targetCurrency}`])
        setExchangeRate(newExchange);
        setTargetValue(sourceValue*newExchange)
            
      }).catch(e => setErrorMessage(e)))

    }

      //Async/Await function of the above, doesn't work balblabla 
/*    const calculateExchange = async () => {
        
      const result = await fetch(`https://free.currconv.com/api/v7/convert?q=${sourceCurrency}_${targetCurrency}&compact=ultra&apiKey=87b4f9fb2be631bed0c8`)
      
      let json;
      if (result) {
        json = await result.json();
        const newExchange = (json.[`${sourceCurrency}_${targetCurrency}`])

        setExchangeRate(newExchange);
        setTargetValue(sourceValue*newExchange)
          
      } else {
        console.log("EXCHANGERATE FETCH FAIL");
      }

    } */

    const updateFromSource = (value : number) => {
        setSourceValue(value)
        setTargetValue(value*exchangeRate)
    }

    const updateFromTarget = (value : number) => {
        setSourceValue(value/exchangeRate)
        setTargetValue(value)
    }

    const swapCurrencies = () => {
      const oldSourceCurrency = sourceCurrency;
      const oldTargetCurrency = targetCurrency;
      setSourceCurrency(oldTargetCurrency);
      setTargetCurrency(oldSourceCurrency);
    }

    return (
        <>
      
        <Container>
          <CurrencySelector  
            key = "A" 
            id = "A" 
            value={sourceValue} 
            currency={sourceCurrency} 
            setCurrency={setSourceCurrency}
            setTargetValue={updateFromSource}
            currencyData={currencyData}
            currencyOrder={currencyOrder}
          />

          <Swapper type="button" onClick={e => swapCurrencies()} value="⇔"/>
          
          <CurrencySelector  
            key = "B" 
            id = "B"
            value={targetValue} 
            currency={targetCurrency} 
            setCurrency={setTargetCurrency} 
            setTargetValue={updateFromTarget} 
            currencyData={currencyData}
            currencyOrder={currencyOrder}

          />

        </Container>

        <div>{errorMessage}</div>


        </>
    )
}

const Swapper = styled.input`
  background-color: #e7e7e7;
  font-size: 35px;
  line-height: 0px;
  height: 31.5px;
  width: 25%;
  border: none;
  :hover {
    color: orange;
    font-weight:900;
  }
  @media (max-width: 850px) {
    margin-bottom: 0.25em;
    padding: 0.125em;
  }
`;
const Container = styled.div`
 
  background-color: #e7e7e7;
  padding: 1.5em;
  margin: 0.25em;
  justify-content: space-between;
  border-radius: 0.3em;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 772px) {
    display: flex;
    flex-direction: row;
    width: 700px;
   }
  

`;

export default App