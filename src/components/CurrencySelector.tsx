import React from 'react'
import styled from 'styled-components';


const CurrencySelector = ( { id, value, currency, setCurrency, setTargetValue, currencyData, currencyOrder} ) => {
    

    //currencyOrder is  an array [["SEK", "Swedish Krona"], ["USD", "American dollar"],...] or [["Swedish Krona", "SEK"], ["American dollar", "USD"],...], ordered alphabetically by currency name
    //currencyData is an object {"SEK"{currencyName: Swedish Krona, currencySymbol: kr, currencyID: SEK},...}

    //Should maybe include currencySymbol in the currencyOrder array as well and not use both currencyOrder and currencyData?
    
    

    return (
       
        <>
        {console.log("CurrencySelector", id, ">> Render")}
        <Selector key ={id+"C"}>
            
            <CurrencySelecter key = {id+"CA"} value={currency} onChange={(e: { target: { value: string; }; }) => setCurrency(e.target.value)} name="currency" id="currency">
                {       
                        //iterates over all the currencies and adds an option for each
                        currencyOrder.map(((currencyOption: React.ReactText[], index: string) => {
                        return (
                            // currencyData[currencyOption[0]]["currencyName"] can also be written as currencyOption[1]
                            //<option key={id+"CA"+index}value={currencyOption[0]}>{currencyData[currencyOption[0]] ? `${currencyData[currencyOption[0]]["currencyName"]}  (${currencyOption[0]})` : "N/A"}</option>);' // NAME (ID)
                            <option key={id+"CA"+index}value={currencyOption[0]}>{currencyData[currencyOption[0]] ? `${currencyOption[0]} (${currencyData[currencyOption[0]]["currencyName"]})` : "N/A"}</option>); // ID (NAME)
                    }))
                } 

            </CurrencySelecter>
            <ValueSelector key ={id+"D"}>
                {console.log("ValueSelector", id, ">> Render")}
                {/* Updates the value when writing, also replaces non-numbers with empty string to not allow non-numbers */}
                <ValueInput key = {id+"DA"} value = {value} onChange = {(e: { target: { value: string; }; }) => {const newValue = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1'); setTargetValue(newValue)}} type="text" name="textinputter"/>
                <CurrencySymbol key ={id+"DB"} >
                    <span>{currencyData[currency] && currencyData[currency]["currencySymbol"] ? currencyData[currency]["currencySymbol"] : currency}</span>
                </CurrencySymbol>
            </ValueSelector>

        </Selector> 
        </>
    )

};

const ValueSelector = styled.div`
    background-color: #ffffff;
    align-items: center;
    display: flex;
    width: 100%;
    height: 2.25em;
`;
const ValueInput = styled.input`
    font-size: 16px;
    border: none;
    width: 100%;
    padding: 0.5em;
    padding-left: 0.75em;

`;
const CurrencySymbol = styled.div`
    background-color: rgba(0, 0, 0, 0.05);
    font-size 16px;
    height: 100%;
    text-align: center;
    //padding: 0.5em;
    font-weight: 900;
    width: 3.5em;
    em;
    >span {
        display: inline-block;
        vertical-align: middle;
        line-height: 210%; //Centering the symbol a bit
    }

`;
const CurrencySelecter = styled.select`
    font-size: 16px;
    padding: 0.5em;
    border: none;
    appearance: button;
    height: 2.25em;
    width:100%;
    :hover {
        color: orange;
    }
    margin-bottom: 1em;
`;
const Selector = styled.div`
    font-size: 16px;
    padding: ;
    border-radius: ;
    width: 100%

`;

export default CurrencySelector