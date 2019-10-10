import React from 'react';
import axios from 'axios';


const BillsApi = (pedidos, setPedidos, cargarData, setCargarData) => {
  var msj = '';
  const getPedidos = async () => {
    try {
      let res = await axios.get("asgasg")
      let data = res.data;
      setPedidos(data.results);
      setCargarData(false);
      if(pedidos) console.log('se cargaron las pedidos');
    } catch(error) {
      console.log('ERROR NO se cargaron las pedidos');
    }
  };
  if(cargarData) {
    getPedidos();
  };
}

export default BillsApi;