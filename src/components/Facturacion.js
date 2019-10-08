import PropTypes from 'prop-types'
import React, {useState,useEffect} from 'react'
import Menus from './Menu';
import perros from '../data/perros';
import { Dropdown } from 'semantic-ui-react'
import {
  Button,
  Checkbox,
  Grid,
  Header,
  Icon,
  Image,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react'

  const VerticalSidebar = ({ animation, direction, visible, detalles }) => (
    
    <Sidebar
      as={Menu}
      animation={animation}
      direction={direction}
      icon='labeled'
      inverted
      vertical
      visible={visible}
      width='thin'
      className='sidebar-factura'
    >
      {detalles ? (
        <div className='container-detalles'>
          <h2>Detalle Pedido</h2>
        {detalles.map((detallePedido, i) => {
          return (
            <div className='detalle-pedido' key={i}>
              <div className='name-detalle' > 
                { detallePedido.nombre }
              </div>
              <Dropdown placeholder='Ingredientes' fluid multiple selection options={
                detallePedido.ingredientes.map((ingrediente,j)=>{
                  var o = Object.assign({},ingrediente);
                  o.key = j;
                  o.text = ingrediente.name;
                  o.value = ingrediente.name;
                  console.log(o);
                  return o;
              })} />
              <div>eliminar</div>
            </div>
          )
        })}
        </div>
      )
      : null
      }
      
    </Sidebar>
  )

  VerticalSidebar.propTypes = {
    animation: PropTypes.string,
    direction: PropTypes.string,
    visible: PropTypes.bool,
  }


  function Facturacion() {
    const [animation,setAnimation] = useState('push');
    const [direction,setDirection] = useState('right');
    const [visible,setVisible] = useState(false);
    let [detalles,setDetalles] = useState([]);
    const [recharge,setRecharge] = useState(false);

    const addPedido = (perro) => {
      detalles.push(perro);
      setVisible(true);
      setRecharge(true); 
      //console.log(perro.nombre)
      
    }

    const showSideBar = () => {
      return (
        <VerticalSidebar
        animation={animation}
        direction={direction}
        visible={visible}
        detalles={detalles}
        />
      )
    }


    return (
      <div>
          <Sidebar.Pushable >

            {recharge && visible ? 
              (showSideBar(),
              setRecharge(false)
              )
            : null }

            <VerticalSidebar
              animation={animation}
              direction={direction}
              visible={visible}
              detalles={detalles}
            />
            <Sidebar.Pusher>
              <Segment className="container-factura">
                <Menus handleClick={addPedido} perros={perros}/>
                <Button className='button-generar' onClick={() => setVisible(!visible)}
                >Push</Button>
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
      </div>
    )
  }

export default Facturacion;