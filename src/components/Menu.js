import React, {useState} from 'react';
import AddMenu from './AddMenu';
import {
  Button
} from 'semantic-ui-react'


const Menu = (props) => {
  const {
    handleClick,
    api,
    rolActivo
  } = props;

  const [perros,setPerros] = useState([]);
  const [bebidas,setBebidas] = useState([]);

  api.getHotDogs((res) => {
    setPerros(res);
  })
  api.getDrinks((res) => {
    setBebidas(res);
  })


  return ( 
    <div className="Menu">
      {rolActivo === 'administrador'?
      <AddMenu api={api} />
      : null }
      <h1>Perros</h1>
      <div className='container-menu'>
        {perros.map((perro, i) => {
          return (
            <div className='container-platillo' key={i} onClick={() => handleClick(perro, 1)}>
              {perro.foto?
                <div className='image-menu' style={{backgroundImage: `url(${perro.foto})`}}/>
                :
                <div className='image-menu' style={{backgroundColor: 'rgb(113, 13, 14)'}}/>
              }
              <div className="overlay-menu"/>
              <div className="label-platillo">{perro.name}</div>
            </div>
          )
        })}
      </div>
      <h1>Bebidas</h1>
      <div className='container-menu'>
        {bebidas.map((bebida, i) => {
          return (
            <div className='container-platillo' key={i} onClick={() => handleClick(bebida, 2)}>
              {bebida.foto?
                <div className='image-menu' style={{backgroundImage: `url(${bebida.foto})`}}/>
                :
                <div className='image-menu' style={{backgroundColor: 'rgb(209, 145, 50)'}}/>
              }
              <div className="overlay-menu"/>
              <div className="label-platillo">{bebida.name}</div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
 
export default Menu;