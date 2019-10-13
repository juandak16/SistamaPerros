import React, { useState, useEffect } from "react";
import "./App.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Wrapper from "./components/Wrapper";
import Reportes from "./components/Reportes";
import Facturacion from "./components/Facturacion";
import Pedidos from "./components/Pedidos";

import API from "./api/api";

//import pedidosData from './data/pedidos';
import usuarios from "./data/usuarios";
import permisos from "./data/permisos";

function App() {
  const [rolActivo, setRolActivo] = useState("administrador");
  const [vistaActiva, setVistaActiva] = useState("login");
  const [vistas, setVistas] = useState([]);

  const api = new API("http://67.207.85.229");
  /*
  api.getSausage((res) => {
    console.log('salchichas:', res);
  })
  api.getHotDogs((res) => {
    console.log('perros:', res);
  })
  api.getDrinks((res) => {
    console.log('bebidas:', res);
  })
  api.getIngredients((res) => {
    console.log('ingredientes:', res);
  })
  api.getBills((res) => {
    console.log('pedidos:', res);
  })
  */

  const login = (username, password) => {
    const usuario = usuarios.find(usuario => usuario.username === username);
    if (usuario && usuario.password === password) {
      console.log("logeado");
      console.log(permisos[usuario.role]);
      setRolActivo(usuario.role);
      setVistas(permisos[usuario.role]);
      setVistaActiva(permisos[usuario.role][0]);
    } else console.log("clave o usuario incorrecto");
  };

  //obligo mostrar la vista del rol activo
  useEffect(() => {
    //console.log(rolActivo);
    if (rolActivo) {
      setVistas(permisos[rolActivo]);
      //la vista 0 pedidos, 1 reportes
      if (vistaActiva === "login") setVistaActiva(permisos[rolActivo][2]);
    }

    //carga de data
    //PerrosApi(perros, setPerros, cargarData, setCargarData);
    //IngredientsApi(ingredientes, setIngredientes, cargarData, setCargarData);
    //SalchichasApi(salchichas, setSalchichas, cargarData, setCargarData);
    //BillsApi(pedidos, setPedidos, cargarData, setCargarData);
    //DrinksApi(bebidas, setBebidas, cargarData, setCargarData);
  });

  return (
    <div className="App">
      {
        //console.log(ingredientes)
      }
      <div className="fondo" />
      <div className="overlay" />
      {vistaActiva !== "login" ? (
        <Navbar vistas={vistas} vistaActiva={vistaActiva} rolActivo={rolActivo} setVistaActiva={setVistaActiva} />
      ) : null}
      <Wrapper>
        {vistaActiva === "login" ? (
          <Login handleLogin={login} />
        ) : vistaActiva === "facturacion" ? (
          <Facturacion api={api} rolActivo={rolActivo} />
        ) : vistaActiva === "pedidos" ? (
          <Pedidos api={api} />
        ) : (
          <Reportes api={api} />
        )}
      </Wrapper>
    </div>
  );
}

export default App;
