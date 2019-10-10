import React from 'react';
import axios from 'axios';
import ingredientesData from '../data/ingredientes';


const IngredientsApi = (ingredientes, setIngredientes, cargarData, setCargarData) => {
  const getIngredientes = async () => {
    try {
      let res = await axios.get("asdasdfsg")
      let data = res.data;
      setIngredientes(data.results);
      setCargarData(false);
      if(ingredientes) console.log('se cargaron las ingredientes');
    } catch(error) {
      console.log('ERROR NO se cargaron las ingredientes');
      if(!ingredientes){
        setIngredientes(ingredientesData);
      }
    }
  };
  if(cargarData) {
    getIngredientes();
  };
}

export default IngredientsApi;