import React, {useState} from 'react';
import { Button,Input,Container } from 'semantic-ui-react'; 

const Login = (props) => {

  const {handleLogin} = props;

  const [usuario,setUsuario] = useState('');
  const [clave,setClave] = useState('');

  const inicioSesion = () => {
    if (usuario != ''  && clave != '' )
      handleLogin(usuario, clave);
    else
      console.log('campos vacios')
  }
  return (
    <div className='Login'>
      <div className='container-login'>
        <h1>LOGIN</h1>
        <Input className='input-login' type="text" value={usuario} onChange={(e) => setUsuario(e.target.value)} placeholder='usuario'/>
        <Input className='input-login' type="text" value={clave} onChange={(e) => setClave(e.target.value)} placeholder='contrasena'/>
        <Button className='button-login' onClick={inicioSesion}>Enter</Button>
      </div>
    </div>
  );
}
 
export default Login;