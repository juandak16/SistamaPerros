import PropTypes from "prop-types";
import React, { useState } from "react";
import Menus from "./Menu";
import { Button, Dropdown, Icon, Menu, Segment, Sidebar } from "semantic-ui-react";

const ingrEliminados = [];

const addPedido = (setVisible, setDetalles, detalles, ingrEliminados, api) => {
  setVisible(false);
  const perros = [];
  const bebidas = [];

  var pedido = Object();

  detalles.map((detalle, i) => {
    if (detalle.tipo === "perro") perros.push(detalle);
    else bebidas.push(detalle._id);
    return null;
  });

  if (perros.length > 0) {
    pedido.hotdogs = perros.map((perro, i) => {
      var pos = perro.pos;
      var o = Object();
      if (ingrEliminados[pos] !== undefined) o.ingredients_off = ingrEliminados[pos];
      o._id = perro._id;
      return o;
    });
  }

  if (bebidas.length > 0) pedido.drinks = bebidas;

  console.log(pedido);
  api.postBills(pedido);
  setDetalles([]);
  //console.log(detalles);
};

const modificarIngredientes = (index, element) => {
  //console.log(element);
  ingrEliminados[index] = element;
};
const deleteDetallePedido = (index, detalles, setDetalles) => {
  let det = [...detalles];
  det.splice(index, 1);
  setDetalles(det);
};
const VerticalSidebar = ({ animation, direction, visible, setVisible, detalles, setDetalles, api }) => (
  <Sidebar
    as={Menu}
    animation={animation}
    direction={direction}
    icon="labeled"
    inverted
    vertical
    visible={visible}
    width="thin"
    className="sidebar-factura"
  >
    {detalles ? (
      <div className="container-detalles">
        <h2>Detalle Pedido</h2>
        {detalles.map((detallePedido, i) => {
          return (
            <div className="detalle-pedido" key={i}>
              <div className="name-detalle">{detallePedido.name}</div>

              {detallePedido.ingredients ? (
                <Dropdown
                  key={i}
                  id="Dropdown"
                  placeholder="Ingredientes"
                  fluid
                  multiple
                  selection
                  options={detallePedido.ingredients.map((ingrediente, j) => {
                    var o = Object.assign({}, ingrediente);
                    //console.log(ingrediente);
                    o.key = j;
                    o.text = ingrediente.name;
                    o.value = ingrediente._id;
                    return o;
                  })}
                  onChange={(event, data) => modificarIngredientes(i, data.value)}
                />
              ) : (
                <div />
              )}

              <Icon
                name="trash alternate outline"
                className="icon-detalle"
                onClick={() => deleteDetallePedido(i, detalles, setDetalles)}
              />
            </div>
          );
        })}
        <Button className="green" onClick={() => addPedido(setVisible, setDetalles, detalles, ingrEliminados, api)}>
          Generar
        </Button>
        <Button className="button-generar red" onClick={() => setVisible(!visible)}>
          Cancelar
        </Button>
      </div>
    ) : null}
  </Sidebar>
);

VerticalSidebar.propTypes = {
  animation: PropTypes.string,
  direction: PropTypes.string,
  visible: PropTypes.bool
};

function Facturacion(props) {
  const { api, rolActivo } = props;
  const [visible, setVisible] = useState(false);
  let [detalles, setDetalles] = useState([]);
  const [recharge, setRecharge] = useState(false);

  const addDetallePedido = (pedido, tipo) => {
    var o = Object.assign({}, pedido);
    o.pos = detalles.length;
    if (tipo === 1) o.tipo = "perro";
    else o.tipo = "bebida";
    //console.log(o);
    detalles.push(o);
    setVisible(true);
    setRecharge(true);
    //console.log(perro.nombre)
  };
  const showSideBar = () => {
    return (
      <VerticalSidebar
        animation="push"
        direction="right"
        visible={visible}
        setVisible={setVisible}
        detalles={detalles}
        setDetalles={setDetalles}
      />
    );
  };

  return (
    <div>
      <Sidebar.Pushable className="container-facturacion">
        {recharge && visible ? (showSideBar(), setRecharge(false)) : null}

        <VerticalSidebar
          animation="push"
          direction="right"
          visible={visible}
          setVisible={setVisible}
          detalles={detalles}
          setDetalles={setDetalles}
          api={api}
        />
        <Sidebar.Pusher>
          <Segment className="big-container">
            {<Menus handleClick={addDetallePedido} api={api} rolActivo={rolActivo} />}
          </Segment>
        </Sidebar.Pusher>
      </Sidebar.Pushable>
    </div>
  );
}

export default Facturacion;
