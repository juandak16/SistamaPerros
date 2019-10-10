import React from 'react';
import axios from 'axios';
import bebidasData from '../data/bebidas';


const DrinksApi = (bebidas, setBebidas, cargarData, setCargarData) => {
  var msj = '';
  //console.log(bebidasData);
  const getBebidas = async () => {
    try {
      let res = await axios.get("agadfgfadh")
      let data = res.data;
      setBebidas(data.results);
      setCargarData(false);
      if(bebidas) console.log('se cargaron las bebidas');
    } catch(error) {

      console.log('ERROR NO se cargaron las bebidas');
      setBebidas(bebidasData);
      //console.log(bebidasData);
    }
  };
  if(cargarData) {
    getBebidas();
  };

}

export default DrinksApi;