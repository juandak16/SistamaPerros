import React from 'react';
import { Button } from 'semantic-ui-react'; 

const Navbar = (props) => {
  const {vistas, rolActivo, setVistaActiva} = props;

  return ( 
    <div className="Navbar">
      <div className='rol-activo'>{rolActivo}</div>
      <div>
        {vistas.map((vista,i) =>
          <Button className="button-navbar" key={i} onClick={ () => {setVistaActiva(vista)} } >{vista}</Button>
        )}
      </div>
    </div>
  );
}
 
export default Navbar;