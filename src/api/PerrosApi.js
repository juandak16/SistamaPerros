import React from 'react';
import axios from 'axios';
import perrosData from '../data/perros';


const PerrosApi = (perros, setPerros, cargarData, setCargarData) => {
  var msj = '';
  const getPerros = async () => {
    try {
      let res = await axios.get("asdag")
      let data = res.data;
      setPerros(data.results);
      setCargarData(false);
      if(perros) console.log('se cargaron las perros');
    } catch(error) {
      console.log('ERROR NO se cargaron las perros');
      if(!perros){
        setPerros(perrosData);
      }
    }
  };
  if(cargarData) {
    getPerros();
  };
}

export default PerrosApi;