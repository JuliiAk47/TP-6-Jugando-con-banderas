import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [name, setName] = useState([]);
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
        console.log(response.data.data);
        console.log(randomElement);
      
      });
  }, []);

  const verificarRespuesta = ()=>{
    if (name===paisRandom.name) {
      console.log("respuesta correcta");
      setPuntaje(puntaje+10);
      const randomElement = paises[Math.floor(Math.random() * paises.length)];
      setPaisRandom(randomElement);

    }
    else{
      console.log("respuesta incorrecta");
      setPuntaje(puntaje-1);
    }
    
  }


  return (
    <div>
      <h1>Adivina el pais</h1>
      <img  src={paisRandom.flag} className='img' />
      <h2>Puntaje: {puntaje}</h2>
      <input type="text" id="pais" placeholder='Adivina la bandera' onKeyUp={(e) => setName(e.target.value)}></input>
      <button type='submit' onClick={verificarRespuesta}>Enviar</button>
    
    </div>
  );
}

export default App;
