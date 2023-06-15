import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [puntaje, setPuntaje] = useState(0);
  const [paises, setPaises] = useState([]);
  const [paisRandom, setPaisRandom] = useState({});

  useEffect(() => {
    axios.get('https://countriesnow.space/api/v0.1/countries/flag/images')
      .then((response) => {
        const paisesResponse = response.data.data;
        setPaises(paisesResponse);

        const randomElement = paisesResponse[Math.floor(Math.random() * paisesResponse.length)];
        setPaisRandom(randomElement);
      });
  }, []);

  const verificarRespuesta = ()=>{
    
  }


  return (
    <div>
      <h1>{ paisRandom.name }</h1>
      <img  src={paisRandom.flag} className='img' />
      <input type="text" id="pais" placeholder='Adivina la bandera'></input>
      <button type='submit' onClick={verificarRespuesta}></button>
      
    </div>
  );
}

export default App;
