import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Alert } from 'bootstrap';

function App() {
  const [name, setName] = useState([]);
  const [puntaje, setPuntaje] = useState(0);
  const [paises, setPaises] = useState([]);
  const [paisRandom, setPaisRandom] = useState({});
  const [timer, setTimer] = useState(0);


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

  useEffect(() => {
    if (paises.length > 0) {
      //setPaisRandom(paises[paisRandom])
      setTimer(15);
    }
  }, [paises]);

  useEffect(() => {
    const cuentaRegresiva = setInterval(() => {
      setTimer((timerAnt) => timerAnt - 1);
    }, 1000);
  
  if (timer === 0) {
    clearInterval(cuentaRegresiva);
    setTimer((puntajeAnt) => puntajeAnt + timer);
  }

  return () => {
    clearInterval(cuentaRegresiva);
  };
}, [timer]);

const verificarRespuesta = (event) => {
  event.preventDefault()
  console.log(event);
  if (event.target.pregunta.value === paisRandom.name) {
    console.log("respuesta correcta");
    setPuntaje(puntaje + 10 + timer);

  }
  else {
    console.log("respuesta incorrecta");
    setPuntaje(puntaje - 1);
  }
  
  event.target.pregunta.value='';
  const randomElement = paises[Math.floor(Math.random() * paises.length)];
  setPaisRandom(randomElement);
  setTimer(15)
}


return (
  <div>
    <h1>Adivina el pais</h1>
    <h2>Tiempo: {timer}</h2>
    <img src={paisRandom.flag} className='img' />
    <h2>Puntaje: {puntaje}</h2>
    <form onSubmit={verificarRespuesta}>
      <input type="text" id="pais" placeholder='Adivina la bandera' name="pregunta"></input>
      <button type='submit'>Enviar</button>
    </form>

  </div>
);
}

export default App;
