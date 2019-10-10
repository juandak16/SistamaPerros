import PropTypes from 'prop-types'
import React, {useState} from 'react'
import Menus from './Menu';
import {
  Button,
  Dropdown,
  Icon,
  Menu,
  Segment,
  Sidebar,
} from 'semantic-ui-react'

  const ingrEliminados = [] ;
  const addPedido = (setVisible, setDetalles, detalles, ingrEliminados) => {
    setVisible(false);
    const perros = [];
    const bebidas = [];

    var pedido = Object();
    
    detalles.map((detalle,i)=>{
      if(detalle.tipo === 'perro')
        perros.push(detalle);
      else
        bebidas.push(detalle);
    })

    pedido.hotdogs =
    perros.map((perro, i ) => {
      var pos = perro.pos;
      var o = Object();
      if(ingrEliminados[pos] !== undefined) o.ingredients_off = ingrEliminados[pos];
      o._id = perro._id;
      return o 
    })
    pedido.drinks =
    bebidas.map((bebida, i ) => {
      var o = Object();
      o._id = bebida._id;
      return o 
    })
    console.log(pedido);
    setDetalles([]);
    //console.log(detalles);
  }
  const modificarIngredientes = (index, element) => {
    ingrEliminados[index] = element;
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
                { detallePedido.name }
              </div>


              {detallePedido.ingredients? <Dropdown key={i} id='Dropdown' placeholder='Ingredientes' fluid multiple selection 
                options={
                detallePedido.ingredients.map((ingrediente,j)=>{
                  var o = Object.assign({},ingrediente);
                  o.key = j;
                  o.text = ingrediente.name;
                  o.value = ingrediente.name;
                  return o;
                })}
                onChange={(event,data) => modificarIngredientes(i,data.value)}
                />: <div/> }



              <Icon name='trash alternate outline' className='icon-detalle' onClick={() => deleteDetallePedido(i,detalles, setDetalles)  } />
            </div>
          )
        })}
          <Button className='green' onClick={() => addPedido(setVisible,setDetalles,detalles,ingrEliminados)}>
            Generar
          </Button>
          <Button className='button-generar red' onClick={() => setVisible(!visible)}>
            Cancelar
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
  


  function Facturacion(props) {
    const {
      api,
      rolActivo
    } = props;
    const [animation,setAnimation] = useState('push');
    const [direction,setDirection] = useState('right');
    const [visible,setVisible] = useState(false);
    let [detalles,setDetalles] = useState([]);
    const [recharge,setRecharge] = useState(false);


    const addDetallePedido = (pedido, tipo) => {
      var o = Object.assign({},pedido);
      o.pos = detalles.length;
      if(tipo === 1) o.tipo = 'perro'
      else o.tipo = 'bebida'
      //console.log(o);
      detalles.push(o);
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
                {<Menus handleClick={addDetallePedido} api={api} rolActivo={rolActivo} />
              }
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
      </div>
    )
  }

export default Facturacion;