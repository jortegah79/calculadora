import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


const valorTeclas = [
  {
    texto: 'CLEAR',
    id: "clear",
    clases: 'tecla col-2 operacion'
  },
  {
    texto: '/',
    id: "divide",
    clases: 'tecla operacion'
  },
  {
    texto: '*',
    id: "multiply",
    clases: 'tecla  operacion'

  },
  {
    texto: '7',
    id: "seven",
    clases: 'tecla inactiva'

  },
  {
    texto: '8',
    id: "eight",
    clases: 'tecla inactiva'

  },
  {
    texto: '9',
    id: "nine",
    clases: 'tecla inactiva'

  },
  {
    texto: '-',
    id: "subtract",
    clases: 'tecla operacion'

  },
  {
    texto: '4',
    id: "four",
    clases: 'tecla inactiva'

  },
  {
    texto: '5',
    id: "five",
    clases: 'tecla inactiva'

  },
  {
    texto: '6',
    id: "six",
    clases: 'tecla inactiva'

  },
  {
    texto: '+',
    id: "add",
    clases: 'tecla  operacion'

  },
  {
    texto: '1',
    id: "one",
    clases: 'tecla inactiva'

  },
  {
    texto: '2',
    id: "two",
    clases: 'tecla inactiva'

  },
  {
    texto: '3',
    id: "three",
    clases: 'tecla inactiva'

  },
  {
    texto: '=',
    id: "equals",
    clases: 'tecla row-2  operacion'
  },
  {
    texto: '0',
    id: "zero",
    clases: 'tecla col-2 inactiva'

  },
  {
    texto: '.',
    id: "decimal",
    clases: 'tecla inactiva'

  }
]

const Pantalla = props => {
  return (
    <div id="pantalla">
      <div id="operaciones" class="txtpantalla">{props.txtOperaciones}</div>
      <div id="display" class="txtpantalla">{props.resultado}</div>
    </div>
  );
}
const Teclado = props => {
  const tec = valorTeclas.map(function (x, i) {
    return (<li key={i} onClick={props.handleClick} id={x.id} className={x.clases}>{x.texto}</li>)
  });
  return (
    <div className='teclado'>
      {tec}
    </div>
  )
}
class Calculadora extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      txtOperaciones: '0',
      operacion: [],
      txtResultado: '0'
    }
    this.handleClick = this.handleClick.bind(this);
  }
  /*************************************************** aqui empieza el control de teclas... */
  handleClick(e) {
    
    let boton = document.getElementById(e.target.id);
    boton.className += ' activa ';
    let valor = e.target.innerText;
    let resultado = this.state.txtResultado;
    let operacion = this.state.operacion;
    let txtOPeraciones = this.state.txtOperaciones
    if (valor === 'CLEAR') {
      resultado = '0';
      operacion = [];
      txtOPeraciones = '0';
      setTimeout(() => {
        boton.className = ' tecla operacion col-2';
      }, 100)
    } else if (+valor >= 1 && +valor <= 9) {
      resultado = resultado === '0' ? valor : resultado + valor;
      setTimeout(() => {
        boton.className = ' tecla inactiva';
      }, 100)
    } else if (valor === '0') {
      resultado = resultado === '0' ? resultado = valor : resultado + valor;
      setTimeout(() => {
        boton.className = ' tecla inactiva col-2';
      }, 100)
    } else if (valor === ('.')) {
      resultado = resultado.includes('.') ? resultado : resultado + '.';
      setTimeout(() => {
        boton.className = ' tecla inactiva';
      }, 100);
    }
    this.setState({
      txtResultado: resultado,
      txtOPeraciones: txtOPeraciones,
      operacion: operacion
    })


    if (valor === '+' || valor === '-' || valor === '*' || valor === '/') {
      setTimeout(() => {
        boton.className = ' tecla operacion';
      }, 100)
      this.setState(
        {
          txtOPeraciones: this.state.txtOperaciones + resultado + valor,
          operacion: [...this.state.operacion, resultado, valor],
          txtResultado: '0'
        }
      )
    }
    if (valor === '=') {
      setTimeout(() => {
        boton.className = ' tecla operacion row-2';
      }, 100)
      resultado=[...this.state.operacion,resultado].join("");
      // eslint-disable-next-line no-eval
      let valor=eval(resultado);
      this.setState(
        {
          txtOPeraciones:'0 ',
          operacion: [],
          txtResultado: valor
      }
      )      
    }
  }
  render() {

    return (
      <div id='App'>
        <h1 className="blanco centrado">Calculadora by J.Ortega</h1>
        <div className="calculadora blanco">
          <h3 >CASIO</h3>
          <Pantalla operaciones={this.state.txtOperaciones} resultado={this.state.txtResultado} />
          <Teclado handleClick={this.handleClick} />
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Calculadora />, document.getElementById('root'));
