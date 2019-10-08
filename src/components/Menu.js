import React from 'react';
import AddMenu from './AddMenu';
import {
  Button
} from 'semantic-ui-react'


const Menu = (props) => {

  const {
    handleClick,
    perros
  } = props;

  return ( 
    <div className="Menu">
      <AddMenu/>
      <h1>Perros</h1>
      <div className='container-menu'>
        {perros.map((perro, i) => {
          return (
            <div className='container-platillo' key={i} onClick={() => handleClick(perro)}>
              <div className='image-menu' style={{backgroundImage: `url(${perro.foto})`}}/>
              <div className="overlay-menu"/>
              <div className="label-platillo">{perro.nombre}</div>
            </div>
          )
        })}
      </div>
      <h1>Bebidas</h1>
      <div className='container-menu'>
        {perros.map((perro, i) => {
          return (
            <div className='container-platillo' key={i} onClick={() => handleClick(perro)}>
              <div className='image-menu' style={{backgroundImage: `url(${perro.foto})`}}/>
              <div className="overlay-menu"/>
              <div className="label-platillo">{perro.nombre}</div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
 
export default Menu;