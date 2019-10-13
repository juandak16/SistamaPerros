import React, { useState, useEffect } from "react";
import { Button, Input, Dropdown, Modal } from "semantic-ui-react";
import Navbar from "./Navbar";

const ModifyMenu = props => {
  const { api } = props;
  const vistas = ["perros", "bebidas", "salchichas", "ingredientes"];
  const [vistaActiva, setVistaActiva] = useState("perros");
  const [list, setList] = useState([]);
  const [optionList, setOptionList] = useState("");

  const [ingredientesAdd, setIngredientesAdd] = useState([]);
  const [salchichaAdd, setSalchichaAdd] = useState("");
  const [nombre, setNombre] = useState("");
  const [precioAdd, setPrecioAdd] = useState("");

  const [salchichas, setSalchichas] = useState([]);
  const [ingredientes, setIngredientes] = useState([]);
  const [perros, setPerros] = useState([]);
  const [bebidas, setBebidas] = useState([]);

  //console.log(DrinksApi);
  useEffect(() => {
    cargar();
  });

  const cargar = () => {
    if (vistaActiva === "perros") {
      if (perros.length === 0) {
        api.getHotDogs(res => {
          setPerros(res);
          setList(res);
        });
        api.getSausage(res => {
          setSalchichas(res);
        });
        api.getIngredients(res => {
          setIngredientes(res);
        });
      } else setList(perros);
    }
    if (vistaActiva === "bebidas") {
      if (bebidas.length === 0) {
        api.getDrinks(res => {
          setBebidas(res);
          setList(res);
        });
      } else setList(bebidas);
    }
    if (vistaActiva === "salchichas") {
      if (salchichas.length === 0) {
        api.getSausage(res => {
          setSalchichas(res);
          setList(res);
        });
      } else setList(salchichas);
    }
    if (vistaActiva === "ingredientes") {
      if (ingredientes.length === 0) {
        api.getIngredients(res => {
          setIngredientes(res);
          setList(res);
        });
      } else setList(ingredientes);
    }

    //console.log(perros, bebidas, salchichas, ingredientes);
  };

  const modifyOptionList = data => {
    setOptionList(data);
    setNombre(list[list.findIndex(i => i._id === data)].name);
    if (vistaActiva === "perros" || vistaActiva === "bebidas") {
      setPrecioAdd(list[list.findIndex(i => i._id === data)].price);
    }
    if (vistaActiva === "perros") {
      setSalchichaAdd(list[list.findIndex(i => i._id === data)].sausage.name);
      setIngredientesAdd(
        list[list.findIndex(i => i._id === data)].ingredients.map((ingrediente, j) => {
          return ingrediente._id;
        })
      );
    }
    //setIngredientesAdd(list[list.findIndex(i => i._id === data)].ingredients);
  };
  const eliminar = () => {
    if (vistaActiva === "perros") api.deleteHotDogs(optionList);
    if (vistaActiva === "bebidas") api.deleteDrinks(optionList);
    if (vistaActiva === "ingredientes") api.deleteIngredients(optionList);
    if (vistaActiva === "salchichas") api.deleteSausage(optionList);
    limpiar();
    cargar();
  };

  const modificar = () => {
    var o = Object();

    if (vistaActiva === "perros") {
      if (nombre && precioAdd && salchichaAdd && ingredientesAdd) {
        o.name = nombre;
        o.price = precioAdd;
        o.sausage = salchichas[salchichas.findIndex(i => i.name === salchichaAdd)]._id;
        o.ingredients = ingredientesAdd;
        api.putHotDogs(o, optionList);
      }
    }

    if (vistaActiva === "bebidas") {
      if (nombre && precioAdd) {
        o.name = nombre;
        o.price = precioAdd;
        api.putDrinks(o, optionList);
      }
    }

    if (vistaActiva === "ingredientes") {
      if (nombre) {
        o.name = nombre;
        api.putIngredients(o, optionList);
      }
    }

    if (vistaActiva === "salchichas") {
      if (nombre) {
        o.name = nombre;
        api.putSausage(o, optionList);
      }
    }
    limpiar();
    cargar();
  };
  const limpiar = () => {
    setNombre("");
    setPrecioAdd("");
    setSalchichaAdd("");
    setIngredientesAdd([]);
    setOptionList("");
    setList([]);
  };

  const changeVistaActiva = data => {
    limpiar();
    setVistaActiva(data);
    cargar();
  };

  return (
    <Modal trigger={<Button className="green"> MODIFICAR </Button>} centered={false}>
      <Modal.Header>
        <Navbar vistas={vistas} vistaActiva={vistaActiva} rolActivo={"Modificar"} setVistaActiva={changeVistaActiva} />
      </Modal.Header>

      <Modal.Content className="container-add">
        <h2 className="title">Modificando {vistaActiva.charAt(0).toUpperCase() + vistaActiva.substr(1)}</h2>
        {list && (
          <Dropdown
            className="select-modify"
            id="Dropdown-modify"
            placeholder={vistaActiva}
            value={optionList}
            fluid
            selection
            options={list.map((art, j) => {
              let o = Object();
              o.key = j;
              o.text = art.name;
              o.value = art._id;
              return o;
            })}
            onChange={(event, data) => modifyOptionList(data.value)}
          />
        )}

        {optionList ? (
          <div>
            <div className="modify">
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

              {vistaActiva === "perros" || vistaActiva === "bebidas" ? (
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

              {vistaActiva === "perros" && (
                <div>
                  <h2 className="subtitle">Salchicha:</h2>
                  <Dropdown
                    className="input-add"
                    id="Dropdown-add"
                    placeholder="Salchichas"
                    text={salchichaAdd}
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

              {vistaActiva === "perros" ? (
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
            <div className="buttons-modify">
              <Button className="button-add" onClick={modificar}>
                Modificar
              </Button>
              <Button className="red button-eliminar" onClick={eliminar}>
                Eliminar
              </Button>
            </div>
          </div>
        ) : null}
      </Modal.Content>
    </Modal>
  );
};

export default ModifyMenu;
