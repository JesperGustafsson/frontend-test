import React, { memo, useState, useEffect, useRef} from 'react'

const CurrencySelector = ( { id, value, currency, setCurrency, setTargetValue } ) => {
    
        return (
            <>
                {console.log(`CurrencySelector ${id} > Render`)}

                <div className="currencySelector">

                    <select defaultValue={currency} onChange={e => setCurrency(e.target.value)}name="currency" id="currency"> {/*Grab all currencies form fixer.io(?)*/}
                        <option value="usd">usd</option>
                        <option value="sek">sek</option>
                        <option value="yen">yen</option>
                        <option value="eur">eur</option>
                    </select>
                    
                </div>  

                <div className="currencyDisplay">

                   {console.log(`ValueSelector ${id} > Render`)}


                    <input value = {value} onChange = {e => setTargetValue(e.target.value)} type="text" name="textinputter"/>

                </div>
            </>
        )

    };

    export default CurrencySelector