import React from 'react';
import perros from '../data/perros';
import PerroList from './PerroList';


const Menu = (props) => {
  return ( 
    <div className="Menu">
      <h1>Perros</h1>
      <div className='container-menu'>
        {perros.map((perro, i) => {
          return <div className='image-menu' key={i} style={{backgroundImage: `url(${perro.foto})`}}/>
        })}
      </div>
      <h1>Bebidas</h1>
      <div className='container-menu'>
        {perros.map((perro, i) => {
          return <img className='image-menu' key={i} src={perro.foto}/>
        })}
      </div>
    </div>
  );
}
 
export default Menu;