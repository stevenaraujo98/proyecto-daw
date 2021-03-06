import React from "react";
import logo from '../../assets/img/logos/barco6x6.svg'
import '../../assets/css/login.css';
import MailOutlinedIcon from '@material-ui/icons/MailOutlined';
import HttpsOutlinedIcon from '@material-ui/icons/HttpsOutlined';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import FaceIcon from '@material-ui/icons/Face';
import { Link } from "react-router-dom";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
  NavLink,
} from "reactstrap";


class Register extends React.Component {
  componentDidMount() {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    this.refs.main.scrollTop = 0;
  }
  constructor(args) {
    super(args)
    this.state = {
      username: "",
      anyUserName: false,
      name: "",
      anyName: false,
      apellido: "",
      anyApellido: false,
      email: "",
      anyEmail: false,
      pass: "",
      anyPass: false,
      pass2: "",
      anyPass2: false,
      loading: false,
    }
  }

  changeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  }

  submitHandler = e => {
    e.preventDefault();

    if(this.state.username === '' || this.state.name === '' || this.state.apellido === '' 
    || this.state.email === '' || this.state.pass === '' || this.state.pass2 === ''){
      this.state.username === '' ? this.setState({anyUserName: true}) : this.setState({anyUserName: false});
      this.state.name  === '' ? this.setState({anyName: true})  : this.setState({anyName: false});
      this.state.apellido  === '' ? this.setState({anyApellido: true})  : this.setState({anyApellido: false});
      this.state.email  === '' ? this.setState({anyEmail: true})  : this.setState({anyEmail: false});
      this.state.pass  === '' ? this.setState({anyPass: true})  : this.setState({anyPass: false});
      this.state.pass2  === '' ? this.setState({anyPass2: true})  : this.setState({anyPass2: false});
    }
    else{
      this.setState({anyUserName: false, anyName: false, anyApellido: false, anyEmail: false, anyPass: false, anyPass2: false, loading: true});
      let currentComponent = this;

      const usuario = {
        "username": this.state.username,
        "name": this.state.name,
        "apellido": this.state.apellido,
        "email": this.state.email,
        "pass": this.state.pass,
        "pass2": this.state.pass2
      }
      
      fetch('http://127.0.0.1:8000/crear_usuario/', {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(usuario),
        headers: {
          'Authorization': '',
          'Content-Type': 'application/json',
        }
      }).then(function (response) {
        console.log(response)
        if (response.ok) {
          console.log('OK')
          return response.text()
        } else {
          // eslint-disable-next-line no-throw-literal
          throw "Error en la llamada Ajax";
        }
      }).then(function (texto) {
        console.log(texto);
        currentComponent.props.history.push("/");
      }).catch(function (err) {
        console.log(err);
        currentComponent.setState({loading: false})
      });
    }
  }


  render() {
    return (
      <>
        <main ref="main">
          <section className="section section-shaped section-lg">
            <div className="shape shape-style-1 bg-gradient-default">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>

            <Container className="pt-lg-md">
              <Row className="justify-content-center">
                <Col lg="5">
                  <Card className="bg-secondary shadow border-0">
                    <CardHeader className="bg-white pb-1">
                      <div className="text-muted text-center mb-1">
                        <h3 className="colorTitle">Registro</h3>
                        <img id="logologin" src={logo} alt="logo" />
                      </div>
                    </CardHeader>
                    <CardBody className="px-lg-4 py-lg-5">
                      <Form role="form" onSubmit={this.submitHandler}>
                        
                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText className="loginCuadro">
                                <FaceIcon />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Nombre de usuario" onChange={e => this.changeHandler(e)} name="username" type="text" className="loginCuadro" />
                          </InputGroup>
                          { this.state.anyUserName &&
                            <div className="font-italic text-left">
                                <small>
                                    <span className="text-failed font-weight-700">
                                        Ingrese nombre de usuario.
                                    </span>
                                </small>
                            </div>
                          }
                        </FormGroup>

                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText className="loginCuadro">
                                <AccountBoxOutlinedIcon />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Nombre" onChange={e => this.changeHandler(e)} name="name" type="text" className="loginCuadro" />
                          </InputGroup>
                          { this.state.anyName &&
                            <div className="font-italic text-left">
                                <small>
                                    <span className="text-failed font-weight-700">
                                        Ingrese nombre.
                                    </span>
                                </small>
                            </div>
                          }
                        </FormGroup>

                        <FormGroup>
                          <InputGroup className="input-group-alternative mb-3">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText className="loginCuadro">
                                <AccountBoxOutlinedIcon />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Apellido" type="text" name="apellido" onChange={e => this.changeHandler(e)} className="loginCuadro" />
                          </InputGroup>
                          { this.state.anyApellido &&
                            <div className="font-italic text-left">
                                <small>
                                    <span className="text-failed font-weight-700">
                                        Ingrese apellido.
                                    </span>
                                </small>
                            </div>
                          }
                        </FormGroup>

                        <FormGroup className="mb-3">
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText className="loginCuadro">
                                <MailOutlinedIcon />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Correo" type="email" name="email" onChange={e => this.changeHandler(e)} className="loginCuadro" />
                          </InputGroup>
                          { this.state.anyEmail &&
                            <div className="font-italic text-left">
                                <small>
                                    <span className="text-failed font-weight-700">
                                        Ingrese correo electrónico.
                                    </span>
                                </small>
                            </div>
                          }
                        </FormGroup>

                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText className="loginCuadro">
                                <HttpsOutlinedIcon />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Contraseña" type="password" name="pass" onChange={e => this.changeHandler(e)} autoComplete="off" className="loginCuadro" />
                          </InputGroup>
                          { this.state.anyPass &&
                            <div className="font-italic text-left">
                                <small>
                                    <span className="text-failed font-weight-700">
                                        Ingrese contraseña.
                                    </span>
                                </small>
                            </div>
                          }
                          
                          { false && 
                            <div className="font-italic text-left">
                              <small>
                                password strength:{" "}
                                <span className="text-success font-weight-700">
                                  strong
                                  </span>
                              </small>
                            </div>
                          }
                        </FormGroup>

                        <FormGroup>
                          <InputGroup className="input-group-alternative">
                            <InputGroupAddon addonType="prepend">
                              <InputGroupText className="loginCuadro">
                                <HttpsOutlinedIcon />
                              </InputGroupText>
                            </InputGroupAddon>
                            <Input placeholder="Confirmar contraseña" name="pass2" type="password" onChange={e => this.changeHandler(e)} autoComplete="off" className="loginCuadro" />
                          </InputGroup>
                          { this.state.anyPass2 &&
                            <div className="font-italic text-left">
                                <small>
                                    <span className="text-failed font-weight-700">
                                        Ingrese contraseña.
                                    </span>
                                </small>
                            </div>
                          }
                        </FormGroup>

                        <Row className="my-4">
                          <Col xs="12">
                            <div className="custom-control custom-control-alternative custom-checkbox">
                              <input className="custom-control-input" id="customCheckRegister" type="checkbox" />
                              <label className="custom-control-label" htmlFor="customCheckRegister" >
                                <span>
                                  Estoy de acuerdo con las{" "}
                                  
                                  <a href="#pablo" onClick={e => e.preventDefault()}>
                                    Politicas de privacidad.
                                  </a>
                                </span>
                              </label>
                            </div>
                          </Col>
                        </Row>
                        
                        <div className="text-center">
                          <Button className="mt-2" type="Submit" disabled={ this.state.loading }>
                            Crear cuenta
                          </Button>
                        </div>
                      
                      </Form>
                    </CardBody>
                  </Card>
                  <Row className="mt-3">
                    <Col className="text-right" xs="12">
                      <NavLink tag={Link} to="/login/" className="text-light"><small>Iniciar sesión</small></NavLink>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <br />
            </Container>
          </section>
        </main>
      </>
    );
  }
}

export default Register;