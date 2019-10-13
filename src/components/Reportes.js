import React, { useState } from "react";
import { Statistic, Icon } from "semantic-ui-react";
const Reportes = props => {
  const { api } = props;
  const [reporte, setReporte] = useState([]);
  const [ingredientes, setIngredientes] = useState([]);
  const [most_droppedI, setMost_droppedI] = useState([]);
  const [less_droppedI, setLess_droppedI] = useState([]);
  const [most_pickedD, setMost_pickedD] = useState([]);
  const [less_pickedD, setLess_pickedD] = useState([]);
  if (reporte.length === 0)
    api.getReports(res => {
      setReporte(res);
      setIngredientes(res.ingredients);
      setMost_droppedI(res.ingredients.most_dropped);
      setLess_droppedI(res.ingredients.less_dropped);
      setMost_pickedD(res.drinks.most_picked);
      setLess_pickedD(res.drinks.less_picked);
    });
  return (
    <div className="big-container">
      <Statistic className="column" size="large">
        <Statistic.Value>{reporte.total_earnings}</Statistic.Value>
        <Statistic.Label>Ingresos Totales</Statistic.Label>
      </Statistic>
      <div className="two-columns">
        <Statistic size="small">
          <Statistic.Value>{reporte.no_drinks}%</Statistic.Value>
          <Statistic.Label>Pedidos sin Bebida</Statistic.Label>
        </Statistic>
        <Statistic size="small">
          <Statistic.Value>{reporte.no_hotdogs}%</Statistic.Value>
          <Statistic.Label>Pedidos sin Perro</Statistic.Label>
        </Statistic>
      </div>


      <div className="four-columns">
        <Statistic size="small">
          <Statistic.Value>{ingredientes.all}%</Statistic.Value>
          <Statistic.Label>Perros con Todo</Statistic.Label>
        </Statistic>
        <Statistic size="small">
          <Statistic.Value>{ingredientes.one}%</Statistic.Value>
          <Statistic.Label>Perros sin un Ingrediente</Statistic.Label>
        </Statistic>
        <Statistic size="small">
          <Statistic.Value>{ingredientes.two}%</Statistic.Value>
          <Statistic.Label>Perros sin dos Ingredientes</Statistic.Label>
        </Statistic>
        <Statistic size="small">
          <Statistic.Value>{ingredientes.more}%</Statistic.Value>
          <Statistic.Label>Perros sin varios Ingredientes</Statistic.Label>
        </Statistic>
      </div>

      <div className="four-columns most_droppedI">
        <Statistic size="small">
          <Statistic.Value className="two-columns">
            <Icon name="arrow up" />
            {most_droppedI.percentage}%
          </Statistic.Value>
          <Statistic.Label>se vende con</Statistic.Label>
        </Statistic>
        <Statistic size="tiny" className="title-report">
          <Statistic.Value>{most_droppedI.name}</Statistic.Value>
        </Statistic>
        <Statistic size="small">
          <Statistic.Value className="two-columns">
            <Icon name="arrow down" />
            {less_droppedI.percentage}%
          </Statistic.Value>
          <Statistic.Label>se vende sin</Statistic.Label>
        </Statistic>
        <Statistic size="tiny" className="title-report">
          <Statistic.Value>{less_droppedI.name}</Statistic.Value>
        </Statistic>
      </div>


      <div className="four-columns most_droppedI">
        <Statistic size="small">
          <Statistic.Value className="two-columns">
            <Icon name="arrow up" />
            {most_pickedD.percentage}%
          </Statistic.Value>
          <Statistic.Label>de las bebidas vendidas es</Statistic.Label>
        </Statistic>
        <Statistic size="tiny" className="title-report">
          <Statistic.Value>{most_pickedD.name}</Statistic.Value>
        </Statistic>
        <Statistic size="small">
          <Statistic.Value className="two-columns">
            <Icon name="arrow down" />
            {less_pickedD.percentage}%
          </Statistic.Value>
          <Statistic.Label>de las bebidas vendidas es</Statistic.Label>
        </Statistic>
        <Statistic size="tiny" className="title-report">
          <Statistic.Value>{less_pickedD.name}</Statistic.Value>
        </Statistic>
      </div>
    </div>
  );
};

export default Reportes;
