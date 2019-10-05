import React, {useState,useEffect} from 'react';
import './App.css';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Wrapper from './components/Wrapper';
import Menu from './components/Menu';
import Reportes from './components/Reportes';
import Facturacion from './components/Facturacion';
import permisos from './data/permisos';
import usuarios from './data/usuarios';

function App() {
  const [rolActivo,setRolActivo] = useState('administrador');
  const [vistaActiva,setVistaActiva] = useState('login');
  const [vistas,setVistas] = useState([]);

  const login = (username, password) => {
    const usuario = usuarios.find(usuario => usuario.username == username);
    if (usuario && usuario.password == password){ 
      console.log('logeado');
      console.log(permisos[usuario.role]);
      setRolActivo(usuario.role);
      setVistas(permisos[usuario.role]);
      setVistaActiva(permisos[usuario.role][0]);
    }else
      console.log('clave o usuario incorrecto');
  }
  //obligo mostrar la vista del rol activo
  useEffect(() => {
    console.log(rolActivo);
    if(rolActivo){
      setVistas(permisos[rolActivo])
      //la vista 0 pedidos, 1 reportes
      setVistaActiva(permisos[rolActivo][0]);
    }
  });

  return (
    <div className="App">
      <div className="fondo"/>
      <div className="overlay"/>
      {vistaActiva !== 'login'? 
      <Navbar
        vistas={vistas}
        vistaActiva={vistaActiva}
        rolActivo={rolActivo}
        setVistaActiva={setVistaActiva}
      /> : null
      }
      <Wrapper>
        {vistaActiva == 'login' ?
          <Login
            handleLogin={login}
          />
        : vistaActiva == 'pedidos' ?
          <Facturacion/>
        :
          <Reportes/>
        }
      </Wrapper>
    </div>
  );
}

export default App;
