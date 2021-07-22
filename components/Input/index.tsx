import React, { InputHTMLAttributes} from 'react'

import styles from '../../styles/Input.module.css'

interface InputProps extends InputHTMLAttributes<HTMLInputElement>{
    label:string,
    currencies:object,
    click:Function,
    
}

const Input:React.FC<InputProps> =({currencies,label, click,...rest})=>{
    return(
        <>
        
        <div className="input-block">
            <label htmlFor="fname">{label}</label>
            <select className={styles.inputs} defaultValue={'EUR'} id="currencies" name="currencies" onClick={(e)=>click(e)}>
            <option value="XXX">Choose Currency</option>
                {currencies}
             </select>
             <input className={styles.inputs} id="input" type='number' step='0.01' value='1.00' placeholder='0.00' {...rest}></input>
        </div>

    </>
    );                
}

export default Input;