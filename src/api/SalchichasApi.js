import React from 'react';
import axios from 'axios';
import salchichasData from '../data/salchichas';


const SalchichasApi = (salchichas, setSalchichas, cargarData, setCargarData) => {
  var msj = '';
  console.log(salchichasData);
  const getSalchichas = async () => {
    try {
      let res = await axios.get("asgsd")
      let data = res.data;
      setSalchichas(data.results);
      setCargarData(false);
      if(salchichas) console.log('se cargaron las salchichas');
    } catch(error) {
      console.log('ERROR NO se cargaron las salchichas');
      if(!salchichas){
        setSalchichas(salchichasData);
      }
    }
  };
  if(cargarData) {
    getSalchichas();
  };
}

export default SalchichasApi;