import React, {useState,useEffect} from 'react';
import { Button, Input, Dropdown, Modal } from 'semantic-ui-react';
import Navbar from './Navbar';



const AddMenu = (props) => {
  const {
    api
  } = props;
  const vistas = ['perro','bebida','salchicha','ingrediente']
  const [vistaActiva,setVistaActiva] = useState('perro')

  const [ingredientesAdd,setIngredientesAdd] = useState(null);
  const [salchichaAdd,setSalchichaAdd] = useState(null);
  const [nombre,setNombre] = useState(null);
  const [precioAdd,setPrecioAdd] = useState(null);

  //console.log(DrinksApi);
  const crear = () => {
    var o = Object();
    o.name = nombre;

    if(precioAdd)
    o.price = precioAdd

    if(salchichaAdd)
    o.sausage = salchichaAdd


    if(ingredientesAdd)
    o.ingredients = ingredientesAdd


    console.log(o,vistaActiva);
  }

  const [salchichas,setSalchichas] = useState([]);
  const [ingredientes,setIngredientes] = useState([]);

  api.getSausage((res) => {
    setSalchichas(res);
  })
  api.getIngredients((res) => {
    setIngredientes(res);
  })
  const limpiar = () =>{

  }
  
  return (
    <Modal trigger={<Button className='green' > AGREGAR </Button>} centered={false}>
      <Modal.Header>
        <Navbar
          vistas={vistas}
          vistaActiva={'perro'}
          rolActivo={'Agregar'}
          setVistaActiva={setVistaActiva}
          onChange={limpiar()}
        />
      </Modal.Header>

      <Modal.Content className='container-add'>
        <h2 className='title'>Creando {vistaActiva.charAt(0).toUpperCase() + vistaActiva.substr(1)}</h2>
        {true ? 

          <div>


            <div className='add'>
              <div>
                <h2 className='subtitle'>Nombre:</h2>
                <Input focus placeholder='Nombre' type='text' className='input-add' onChange={ (event,data) => setNombre(data.value) } />
              </div>

              {vistaActiva === 'perro' || vistaActiva === 'bebida'?
              <div>
                <h2 className='subtitle'>Precio:</h2>
                <Input focus placeholder='Precio' type='number' className='input-add' onChange={ (event,data) => setPrecioAdd(data.value) } />
              </div> : null}

              {vistaActiva === 'perro' ?
              <div>
                <h2 className='subtitle'>Salchicha:</h2>
                <Dropdown className="input-add" id='Dropdown-add' placeholder='Salchichas' fluid selection options={
                  salchichas.map((salchicha,j)=>{
                    var o = Object();
                    o.key = j;
                    o.text = salchicha.name;
                    o.value = salchicha.name;
                    return o;
                  })}
                  onChange={(event,data) => setSalchichaAdd(data.value)}
                  />
              </div> : null}

              {vistaActiva === 'perro' ?
              <div>
                <h2 className='subtitle'>Ingredientes:</h2>
                <Dropdown className="input-add" id='Dropdown-add' placeholder='Ingredientes' fluid multiple selection options={
                  ingredientes.map((ingrediente,j)=>{
                    var o = Object();
                    o.key = j;
                    o.text = ingrediente.name;
                    o.value = ingrediente.name;
                    return o;
                  })}
                  onChange={(event,data) => setIngredientesAdd(data.value)}
                />
              </div> : null}


            </div>
            <Button className='button-add' onClick={ crear } > Crear </Button>
          </div>
        : vistaActiva === 'bebida'? 'bebida' : vistaActiva === 'salchicha' ? 'salchicha' : 'ingrediente'} 
      </Modal.Content>
    </Modal>
  )
}

export default AddMenu