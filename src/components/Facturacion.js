import PropTypes from 'prop-types'
import React, {useState} from 'react'
import Menus from './Menu';
import perros from '../data/perros';
import {
  Button,
  Dropdown,
  Icon,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react'

  const addPedido = (setVisible,setDetalles,detalles) => {
    setVisible(false);
    setDetalles([]);
    console.log(detalles);
  }

  const deleteDetallePedido = (index, detalles, setDetalles) => {
    let det = [...detalles];
    det.splice(index,1);
    setDetalles(det);
  }

  const VerticalSidebar = ({ animation, direction, visible, setVisible, detalles, setDetalles }) => (
    
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
                  return o;
              })} />
              <Icon name='trash alternate outline' className='icon-detalle' onClick={() => deleteDetallePedido(i,detalles, setDetalles)  } />
            </div>
          )
        })}
          <Button onClick={() => addPedido(setVisible,setDetalles,detalles)}>
            Generar
          </Button>
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

    const addDetallePedido = (perro) => {
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
        setVisible={setVisible}
        detalles={detalles}
        setDetalles={setDetalles}
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
              setVisible={setVisible}
              detalles={detalles}
              setDetalles={setDetalles}
            />
            <Sidebar.Pusher>
              <Segment className="container-factura">
                <Menus handleClick={addDetallePedido} perros={perros}/>
                <Button className='button-generar' onClick={() => setVisible(!visible)}
                >Push</Button>
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
      </div>
    )
  }

export default Facturacion;