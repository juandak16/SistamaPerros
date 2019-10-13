import React, { useState } from "react";
import { Accordion } from "semantic-ui-react";

const Pedidos = props => {
  const { api } = props;
  const [activeIndex, setActiveIndex] = useState(0);
  const [pedidos, setpedidos] = useState([]);

  const handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const newIndex = activeIndex === index ? -1 : index;

    setActiveIndex(newIndex);
  };
  if (pedidos.length === 0) {
    api.getBills(res => {
      //console.log(res);
      setpedidos(res);
    });
  }

  return (
    <div className="big-container">
      <Accordion fluid styled>
        {pedidos.map((pedido, i) => {
          //console.log(pedido);
          return (
            <div key={i}>
              <Accordion.Title active={activeIndex === i} index={i} onClick={handleClick} className="title-pedido">
                <div>Perros: {pedido.hotdogs.length}</div>
                <div>Bebidas: {pedido.drinks.length}</div>
                <div>Total: {pedido.total_price} BsS</div>
              </Accordion.Title>

              <Accordion.Content active={activeIndex === i}>
                <div className="container-pedido">
                  <div>
                    {pedido.hotdogs.length > 0 &&
                      pedido.hotdogs.map((perro, j) => {
                        //(perro);
                        return (
                          <div className="margin-top" key={j}>
                            <div className="subtitle">{perro.name}</div>
                            {perro.ingredients_off.length > 0 && (
                              <ul className="rows">
                                {perro.ingredients_off.map((ingrediente, k) => {
                                  return <li key={k}>Sin {ingrediente.name}</li>;
                                })}
                              </ul>
                            )}
                          </div>
                        );
                      })}
                  </div>

                  {
                    <div className="rows">
                      {pedido.drinks.length > 0 &&
                        pedido.drinks.map((bebida, j) => {
                          return (
                            <div className="margin-top" key={j}>
                              <div className="subtitle">{bebida.name}</div>
                            </div>
                          );
                        })}
                    </div>
                  }
                </div>
              </Accordion.Content>
            </div>
          );
        })}
      </Accordion>
    </div>
  );
};

export default Pedidos;
