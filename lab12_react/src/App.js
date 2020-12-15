  
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';

const url="http://127.0.0.1:8000/api/prestamo/";

class App extends Component {
  state={
    data:[],
    libros:[],
    autores:[],
    usuarios:[],
    modalInsertar: false,
    modalEliminar: false,
    id : '',
    libro: {},
    usuario: '',
    fecha_prestamo: '',
    fecha_devolucion: ''
    // form:{
    //   id: '',
    //   libro: '',
    //   usuario: '',
    //   fecha_prestamo: '',
    //   fecha_devolucion: ''
    // }
  }

  peticionGet = () => {
    axios.get(url+"listar").then(response=>{
      this.setState({data: response.data});

    }).catch(error=>{
      console.log(error.message);
    })
  }

  getAutoresAndUsuarios = () => {
    axios.get(url+"crear")
      .then(response => {
        this.setState({autores: response.data.autores});
        this.setState({usuarios: response.data.usuarios});
        // console.log(this.state);
      }).catch(error => console.log(error))
      
  }

  getLibrosByAutor = e => {
    // console.log(e.target.value);
    // console.log(e.target.value);
    axios.get(`http://127.0.0.1:8000/api/autor/${e.target.value}`)
      .then(response => {
        this.setState({libros: response.data});
        console.log(this.state);
        // console.log(response.data);
      })
      .catch(error => console.log(error));
    
    // console.log(this.state);
  }

  mostrarAutores(){
    return(
      <div>
        <select id="autores" onChange={this.getLibrosByAutor} name="autor">
        <option>Seleccione un autor</option>
          {this.state.autores.map(autor => {
            return(
              <option value={autor.id} >{autor.nombre}</option>
            )
          })}
        </select>
      </div>
    )
  }
  mostrarLibros(){
    return(
      <div>
        <select id="libros" onChange={this.handleChange} name="libro">
          <option>Seleccione un libro</option>
          {this.state.libros.map(libro => {
            return(
              <option value={JSON.stringify(libro)} >{libro.titulo}</option>
            )
          })}
        </select>
      </div>
    )
  }
  mostrarUsuarios(){
    return(
      <div>
        <select id="usuarios" onChange={this.handleChange} name="usuario">
          <option>Seleccione un usuario</option>
          {this.state.usuarios.map(usuario => {
            return(
              <option value={JSON.stringify(usuario)} >{usuario.nombre}</option>
            )
          })}
        </select>
      </div>
    )
  }
peticionPost=async()=>{
  // delete this.state.form.id;
  await axios.post(url+"guardar",{
    usuario: JSON.parse(this.state.usuario),
    libro: JSON.parse(this.state.libro),
    fecha_devolucion: this.state.fecha_devolucion,
    fecha_prestamo: this.state.fecha_prestamo
  }).then(response=>{
    this.modalInsertar();
    this.peticionGet();
  }).catch(error=>{
    console.log(error.message);
  });
}

// peticionPut=()=>{
//   axios.put(url+this.state.form.id, this.state.form).then(response=>{
//     this.modalInsertar();
//     this.peticionGet();
//   })
// }

// peticionDelete=()=>{
//   axios.delete(url+this.state.form.id).then(response=>{
//     this.setState({modalEliminar: false});
//     this.peticionGet();
//   })
// }

modalInsertar=()=>{
  this.setState({modalInsertar: !this.state.modalInsertar});
}

// seleccionarEmpresa=(empresa)=>{
//   this.setState({
//     tipoModal: 'actualizar',
//     form: {
//       id: empresa.id,
//       nombre: empresa.nombre,
//       pais: empresa.pais,
//       capital_bursatil: empresa.capital_bursatil
//     }
//   })
// }

handleChange = async e=>{
  e.persist();
  await this.setState({ [e.target.name]: e.target.value });
  console.log(this.state);
}
  // handleChange(event) {
  //   this.setState({form: event.target.value});
  //   console.log(this.state.form.autor);
  // }

  componentDidMount() {
    this.peticionGet();
  }
  

  render(){
    //form es formulario del this.state
    const {id}=this.state;
    return (
      <div className="App">
        <br /><br /><br />
        <button className="btn btn-success" 
        onClick={() =>{ 
            this.setState({id: null, tipoModal: 'insertar'}); 
            this.modalInsertar();
            this.getAutoresAndUsuarios();
            
          }
        }>
          Agregar Empresa
        </button>
      <br /><br />
      <table className="table ">
        <thead>
          <tr>
            <th>ID</th>
            <th>Libro</th>
            <th>Usuaario</th>
            <th>Fecha de préstamo</th>
            <th>Fecha de devolución</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {this.state.data.map((prestamo, index)=>{
            return(
              <tr>
                <td>{prestamo.id}</td>
                <td>{prestamo.libro.titulo}</td>
                <td >{prestamo.usuario.nombre}</td>
                <td>{prestamo.fecha_prestamo}</td>
                <td>{prestamo.fecha_devolucion}</td>
                <td>
                  {/* <button className="btn btn-primary" onClick={()=>{this.seleccionarEmpresa(prestamo); this.modalInsertar()}}></button>
                  {"   "}
                  <button className="btn btn-danger" onClick={()=>{this.seleccionarEmpresa(prestamo); this.setState({modalEliminar: true})}}></button> */}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      <Modal isOpen={this.state.modalInsertar}>
        <ModalHeader style={{display: 'block'}}>
          <span style={{float: 'right'}} onClick={()=>this.modalInsertar()}>x</span>
        </ModalHeader>
        <ModalBody>
          <div className="id-group">
            <label htmlFor="id">ID</label>
            <input className="form-control" type="text" name="id" id="id" readOnly onChange={this.handleChange} value={id ? 'update' : this.state.data.length+1}/>
            <br />
            <label htmlFor="Autor">Autor</label>
            { id ? '' : this.mostrarAutores() }
            

            <br/>
            <label htmlFor="libro">Libro</label>
            { id ? '' : this.mostrarLibros() }

            <label htmlFor="usuario">Usuario</label>
            { id ? '' : this.mostrarUsuarios() }
            {/* <input className="form-control" type="text" name="nombre" id="nombre" onChange={this.handleChange} value={form ? form.nombre: ''}/> */}
            {/* <select id="lang">
              {  }
              <option value="select" onChange={this.change}>Select</option>
              <option value="Java" onChange={this.change}>Java</option>
              <option value="C++" onChange={this.change}>C++</option>
            </select> */}
            <br />
            <label htmlFor="fecha_devolucion">Fecha de devolucion</label>
            <input type="datetime" name="fecha_devolucion" onChange={this.handleChange}/>
            {/* <label htmlFor="nombre">País</label>
            <input className="form-control" type="text" name="pais" id="pais" onChange={this.handleChange} value={id? 'update' : ''}/>
            <br />
            <label htmlFor="capital_bursatil">Capital Bursatil</label>
            <input className="form-control" type="text" name="capital_bursatil" id="capital_bursatil" onChange={this.handleChange} value={id?'update':''}/> */}
          </div>
        </ModalBody>

          <ModalFooter>
            {this.state.tipoModal=='insertar'?
              <button className="btn btn-success" onClick={()=>this.peticionPost()}>
              Insertar
            </button>: <button className="btn btn-primary" onClick={()=>this.peticionPut()}>
              Actualizar
            </button>
            }
              <button className="btn btn-danger" onClick={()=>this.modalInsertar()}>Cancelar</button>
          </ModalFooter>
        </Modal>
        <Modal isOpen={this.state.modalEliminar}>
          <ModalBody>
            {/* Estás seguro que deseas eliminar a la empresa {form && form.nombre} */}
          </ModalBody>
          <ModalFooter>
            <button className="btn btn-danger" onClick={()=>this.peticionDelete()}>Sí</button>
            <button className="btn btn-secundary" onClick={()=>this.setState({modalEliminar: false})}>No</button>
          </ModalFooter>
        </Modal>
      </div>



      );
}
}
export default App;