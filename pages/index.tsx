import Head from 'next/head'
import Image from 'next/image'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import { useEffect, useState } from 'react';

import Input from '../components/Input'
import api from '../services/api';
import dollarImage from '../assets/images/currency_dollar.png'
import euroImage from '../assets/images/currency_euro.png'

export default function Home({serverCurrencies}:any) {
  const [val1, setval1] = useState(1.000);
    const [val2, setval2] = useState(1);
    const [cur1,setcur1]=useState('XXX');
    const [cur2,setcur2]=useState('XXX');
    const [currencies,setcurrencies]=useState<Array<JSX.Element>>([]);

    useEffect(()=>{
    },[val2,currencies])

    useEffect(()=>{
        if(cur1===cur2)
            { setval2(val1);return}
    },[val1,cur1,cur2])
    useEffect(()=>{
        getcurrencies();
    },[])

    function handleChangeCurrency_1(e:React.MouseEvent<HTMLSelectElement, MouseEvent>){
        setcur1(e.currentTarget.value);
    }
    function handleChangeCurrency_2(e:React.MouseEvent<HTMLSelectElement, MouseEvent>){
        setcur2(e.currentTarget.value);
    }

    async function convert() {
        try{
            if(cur1==='XXX' || cur2==='XXX')
            {
              alert("Please select currencies!");
              return
            }
            if(cur1===cur2)
            { setval2(val1);return}
         
            const response= await api.get('latest?amount='+val1.toString()+'&from='+cur1+'&to='+cur2);
         
         console.log(Object.values(response.data.rates)[0])
         setval2(Object.values(response.data.rates)[0] as number)
        }catch(e){
            alert("Invalid insert value!");
            console.log('latest?amount='+val1.toString()+'&from='+cur1+'&to='+cur2); 
        }
         
     }

     async function getcurrencies(){
        const array:Array<JSX.Element>=[];
        for(const [key, value] of Object.entries(serverCurrencies)) {  
            array.push(<option key={key} value={key}>{value as string+' ('+key+')'}</option>)  
        }  
        setcurrencies(array);    
     }


    return(
        <>
          <Head>
            <title>Convert Currency</title>
          </Head>
        <div className="page">
              <div className="header">
                  <Image className="imagem" src={dollarImage} alt="dollar"/>
                  <h1 className="titulo">Convert Currency</h1>
                  <Image className="imagem" src={euroImage} alt="euro"/>
              </div>
              <div className="body">
                  <Input click={handleChangeCurrency_1} currencies={currencies} label="From" onChange={(e)=>{setval1(parseInt(e.target.value))}} value={val1}/>
                  
                  <Input  disabled click={handleChangeCurrency_2} currencies={currencies} label="To" onChange={(e)=>{setval2(parseInt(e.target.value))}} value={val2}/>
                  
                  
              </div>
              <div className="btn">
                      <button className="button" onClick={convert}>Convert</button>
              </div>
              <div className="fotter">
                <h2>Available on <a id="githublink" href="https://github.com/28rodrigo/convert-corrency">GitHub</a></h2>
              </div>
        </div> 
        </>
       
    )
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  const response= await api.get('currencies');
  const serverCurrencies=response.data;
  return {
    props: {
      serverCurrencies,
    },
  }
}

