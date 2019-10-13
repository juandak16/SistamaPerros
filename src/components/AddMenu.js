import React, { useState, useEffect } from "react";
import { Button, Input, Dropdown, Modal } from "semantic-ui-react";
import Navbar from "./Navbar";

const AddMenu = props => {
  const { api } = props;
  const vistas = ["perro", "bebida", "salchicha", "ingrediente"];
  const [vistaActiva, setVistaActiva] = useState("perro");

  const [ingredientesAdd, setIngredientesAdd] = useState([]);
  const [salchichaAdd, setSalchichaAdd] = useState("");
  const [nombre, setNombre] = useState("");
  const [precioAdd, setPrecioAdd] = useState("");

  const [salchichas, setSalchichas] = useState([]);
  const [ingredientes, setIngredientes] = useState([]);

  //console.log(DrinksApi);
  useEffect(() => {
    if (salchichas.length === 0 || ingredientes.length === 0) cargar();
  });

  const cargar = () => {
    api.getSausage(res => {
      setSalchichas(res);
    });
    api.getIngredients(res => {
      setIngredientes(res);
    });
  };

  const crear = () => {
    var o = Object();

    if (vistaActiva === "perro") {
      if (nombre && precioAdd && salchichaAdd && ingredientesAdd) {
        o.name = nombre;
        o.price = precioAdd;
        o.sausage = salchichaAdd;
        o.ingredients = ingredientesAdd;
        api.postHotDogs(o);
      }
    }

    if (vistaActiva === "bebida") {
      if (nombre && precioAdd) {
        o.name = nombre;
        o.price = precioAdd;
        api.postDrinks(o);
      }
    }

    if (vistaActiva === "ingrediente") {
      if (nombre) {
        o.name = nombre;
        api.postIngredients(o);
      }
    }

    if (vistaActiva === "salchicha") {
      if (nombre) {
        o.name = nombre;
        api.postSausage(o);
      }
    }
    limpiar();
    cargar();
    //console.log(o, vistaActiva);
  };
  const limpiar = () => {
    setNombre("");
    setPrecioAdd("");
    setSalchichaAdd("");
    setIngredientesAdd([]);
  };

  const changeVistaActiva = data => {
    limpiar();
    setVistaActiva(data);
  };

  return (
    <Modal trigger={<Button className="green"> AGREGAR </Button>} centered={false}>
      <Modal.Header>
        <Navbar vistas={vistas} vistaActiva={"perro"} rolActivo={"Agregar"} setVistaActiva={changeVistaActiva} />
      </Modal.Header>

      <Modal.Content className="container-add">
        <h2 className="title">Creando {vistaActiva.charAt(0).toUpperCase() + vistaActiva.substr(1)}</h2>
        {true ? (
          <div>
            <div className="add">
              <div>
                <h2 className="subtitle">Nombre:</h2>
                <Input
                  focus
                  placeholder="Nombre"
                  type="text"
                  className="input-add"
                  value={nombre}
                  onChange={(event, data) => setNombre(data.value)}
                />
              </div>

              {vistaActiva === "perro" || vistaActiva === "bebida" ? (
                <div>
                  <h2 className="subtitle">Precio:</h2>
                  <Input
                    focus
                    placeholder="Precio"
                    type="number"
                    className="input-add"
                    value={precioAdd}
                    onChange={(event, data) => setPrecioAdd(data.value)}
                  />
                </div>
              ) : null}

              {vistaActiva === "perro" && (
                <div>
                  <h2 className="subtitle">Salchicha:</h2>
                  <Dropdown
                    className="input-add"
                    id="Dropdown-add"
                    placeholder="Salchichas"
                    value={salchichaAdd}
                    fluid
                    selection
                    options={salchichas.map((salchicha, j) => {
                      var o = Object();
                      o.key = j;
                      o.text = salchicha.name;
                      o.value = salchicha._id;
                      return o;
                    })}
                    onChange={(event, data) => setSalchichaAdd(data.value)}
                  />
                </div>
              )}

              {vistaActiva === "perro" ? (
                <div>
                  <h2 className="subtitle">Ingredientes:</h2>
                  <Dropdown
                    className="input-add"
                    id="Dropdown-add"
                    placeholder="Ingredientes"
                    value={ingredientesAdd}
                    fluid
                    multiple
                    selection
                    options={ingredientes.map((ingrediente, j) => {
                      var o = Object();
                      o.key = j;
                      o.text = ingrediente.name;
                      o.value = ingrediente._id;
                      return o;
                    })}
                    onChange={(event, data) => setIngredientesAdd(data.value)}
                  />
                </div>
              ) : null}
            </div>
            <Button className="button-add" onClick={crear}>
              Crear
            </Button>
          </div>
        ) : vistaActiva === "bebida" ? (
          "bebida"
        ) : vistaActiva === "salchicha" ? (
          "salchicha"
        ) : (
          "ingrediente"
        )}
      </Modal.Content>
    </Modal>
  );
};

export default AddMenu;
