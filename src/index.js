import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const Pantalla = props => {
  return (
    <div id="pantalla">
      <div id="display" class="txtpantalla">{props.resultado}</div>
    </div>
  );
}
const Teclado = props => {
  const tec = props.tecla.map(function (x, i) {
    return (<li key={i} onClick={x.click} id={x.id} className={x.clases}>{x.texto}</li>)
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
      operacion: [],
      resultado: '0',
      operacionAritmetica: [],
      resFinal : false
    }
    this.handleClickNum = this.handleClickNum.bind(this);
    this.handleClickOps = this.handleClickOps.bind(this);
    this.handleClickClr = this.handleClickClr.bind(this);
    this.handleClickEq = this.handleClickEq.bind(this);
    this.compruebaComa=this.compruebaComa.bind(this);
    this.compruebaSignos=this.compruebaSignos.bind(this);
  }
 
  /*************************************************control de clear                ********* */
  handleClickClr(e) {
    let boton = document.getElementById(e.target.id);
    boton.className += ' operactiva ';
    setTimeout(() => {
      boton.className = ' tecla operacion col-2';
    }, 100);
    this.setState({
      resultado: '0',
      operacion: [],
      operacionAritmetica: [],
      resFinal : false
    }); 
  }

  /*************************************************** aqui empieza el control de teclas... */
  handleClickNum(e) {
    let resultado;
    if(this.state.resFinal){
      resultado='0'
    }else{
      resultado = this.state.resultado;
      //numero guardado en estado
    }
    let operacion=this.compruebaSignos(this.state.operacion);
    let boton = document.getElementById(e.target.id);
    boton.className += ' activa ';
    //boton pulsado
    let valor = e.target.innerText;
    //caracter que activa el boton  
    if (valor >= 0 && valor <= 9) {
      resultado = resultado === '0' ? valor : resultado + valor;
      setTimeout(() => {
        boton.className = valor === '0' ? ' tecla inactiva col-2' : ' tecla inactiva';
      }, 100);
    } else if (valor === '.') {
      resultado = resultado.includes('.') ? resultado : resultado + '.';     
      setTimeout(() => {
        boton.className = ' tecla inactiva';
      }, 100);
    }
    this.setState({
      resultado: resultado,
      operacionAritmetica: this.state.resultado.length===1?[...this.state.operacionAritmetica,operacion]:this.state.operacionAritmetica,
      operacion:[],
      resFinal : false    
    });
    //manejamos solo el resultado. 
  }
  /****************************************************************control de =                */
  handleClickEq(e) {
    let boton = document.getElementById(e.target.id);
    boton.className += ' operactiva ';   
    setTimeout(() => {
      boton.className = ' tecla operacion row-2';
    }, 100)
    let resultado= parseFloat(this.state.resultado);
    let newResultado = [...this.state.operacionAritmetica, resultado].join('');
    // eslint-disable-next-line no-eval
    let valor = eval(newResultado);
    this.setState(
      {
        operacion: [],
        resultado: valor,       
        operacionAritmetica:[],
        resFinal :true
      }
    )  
  }
  /**********************************************control de operaciones ********************** */
  handleClickOps(e) {
    let boton = document.getElementById(e.target.id);
    boton.className += ' operactiva ';
    setTimeout(()=>{
      boton.className = ' tecla operacion';
    }, 100);
    this.setState({
       resultado: '0',
       operacionAritmetica:this.state.operacion.length===0?[...this.state.operacionAritmetica, parseFloat(this.state.resultado)]:[...this.state.operacionAritmetica],
       operacion: [...this.state.operacion,e.target.innerText],
       resFinal:false
      });
    }
  compruebaSignos(arr){
    let arr2=arr[arr.length-1] !== '-'?arr.slice(-1):arr.slice(-2);    
    return arr2.join('');
 }
 compruebaComa(x){
   let arr=x.split("");
   return arr.some(z=>z==='.')
 }
  render() {
    const valorTeclas = [
      {
        texto: 'CLEAR',
        id: "clear",
        clases: 'tecla col-2 operacion',
        click: this.handleClickClr
      },
      {
        texto: '/',
        id: "divide",
        clases: 'tecla operacion',
        click: this.handleClickOps
      },
      {
        texto: '*',
        id: "multiply",
        clases: 'tecla  operacion',
        click: this.handleClickOps
      },
      {
        texto: '7',
        id: "seven",
        clases: 'tecla inactiva',
        click: this.handleClickNum
      },
      {
        texto: '8',
        id: "eight",
        clases: 'tecla inactiva',
        click: this.handleClickNum
      },
      {
        texto: '9',
        id: "nine",
        clases: 'tecla inactiva',
        click: this.handleClickNum
      },
      {
        texto: '-',
        id: "subtract",
        clases: 'tecla operacion',
        click: this.handleClickOps
      },
      {
        texto: '4',
        id: "four",
        clases: 'tecla inactiva',
        click: this.handleClickNum
      },
      {
        texto: '5',
        id: "five",
        clases: 'tecla inactiva',
        click: this.handleClickNum
      },
      {
        texto: '6',
        id: "six",
        clases: 'tecla inactiva',
        click: this.handleClickNum
      },
      {
        texto: '+',
        id: "add",
        clases: 'tecla  operacion',
        click: this.handleClickOps
      },
      {
        texto: '1',
        id: "one",
        clases: 'tecla inactiva',
        click: this.handleClickNum
      },
      {
        texto: '2',
        id: "two",
        clases: 'tecla inactiva',
        click: this.handleClickNum
      },
      {
        texto: '3',
        id: "three",
        clases: 'tecla inactiva',
        click: this.handleClickNum
      },
      {
        texto: '=',
        id: "equals",
        clases: 'tecla row-2  operacion',
        click: this.handleClickEq
      },
      {
        texto: '0',
        id: "zero",
        clases: 'tecla col-2 inactiva',
        click: this.handleClickNum
      },
      {
        texto: '.',
        id: "decimal",
        clases: 'tecla inactiva',
        click: this.handleClickNum
      }
    ]
    return (
      <div id='App'>
        <h1 className="blanco centrado">Calculadora by J.Ortega</h1>
        <div className="calculadora blanco">
          <h3 >CASIO</h3>
          <Pantalla resultado={this.state.resultado} />
          <Teclado tecla={valorTeclas} />
        </div>
      </div>
    );
  }
}
ReactDOM.render(<Calculadora />, document.getElementById('root'));
