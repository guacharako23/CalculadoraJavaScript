// Variables globales para manejar el estado de la calculadora
let entradaActual = ''; // Valor que el usuario va ingresando
let operacionPendiente = false; // Indica si se ha presionado un operador
let operadorActual = ''; // Operador actual (+, -, *, /)
let primerOperando = 0; // Primer número ingresado
let expresionCompleta = ''; // Representación de la operación en pantalla

// Agrega números al campo de entrada
function agregarNumero(numero) {
    if (operacionPendiente) {
        entradaActual = numero;
        operacionPendiente = false;
    } else {
        entradaActual += numero;
    }
    expresionCompleta = (primerOperando !== 0 ? primerOperando + ' ' + operadorActual + ' ' : '') + entradaActual;
    actualizarPantalla(expresionCompleta);
}

// Agrega un punto decimal si aún no existe
function agregarDecimal() {
    if (entradaActual === '') {
        entradaActual = '0.';
    } else if (!entradaActual.includes('.')) {
        entradaActual += '.';
    }
    expresionCompleta = (primerOperando !== 0 ? primerOperando + ' ' + operadorActual + ' ' : '') + entradaActual;
    actualizarPantalla(expresionCompleta);
}

// Registra el operador y prepara el siguiente operando
function agregarOperador(operador) {
    if (entradaActual === '' && operador === '-') {
        entradaActual = '-';
        actualizarPantalla(entradaActual);
        return;
    }

    if (entradaActual !== '') {
        if (operadorActual !== '') {
            calcularResultado(false);
        }
        primerOperando = parseFloat(entradaActual);
        operadorActual = operador;
        operacionPendiente = true;
        expresionCompleta = primerOperando + ' ' + operadorActual;
        entradaActual = '';
        actualizarPantalla(expresionCompleta);
    }
}

// Limpia toda la calculadora
function limpiarPantalla() {
    entradaActual = '';
    operadorActual = '';
    primerOperando = 0;
    operacionPendiente = false;
    expresionCompleta = '';
    actualizarPantalla('0');
}

// Ejecuta la operación entre los operandos y muestra el resultado
function calcularResultado(mostrarSoloResultado = true) {
    if (operadorActual === '' || entradaActual === '') return;

    const segundoOperando = parseFloat(entradaActual);
    let resultado = 0;

    switch (operadorActual) {
        case '+':
            resultado = primerOperando + segundoOperando;
            break;
        case '-':
            resultado = primerOperando - segundoOperando;
            break;
        case '*':
            resultado = primerOperando * segundoOperando;
            break;
        case '/':
            resultado = segundoOperando === 0 ? 'Error: División por cero' : primerOperando / segundoOperando;
            break;
    }

    expresionCompleta = mostrarSoloResultado ? resultado.toString() : `${primerOperando} ${operadorActual} ${segundoOperando}`;
    entradaActual = resultado.toString();
    operadorActual = '';
    operacionPendiente = true;
    actualizarPantalla(expresionCompleta);
}

// Muestra el valor en el input
function actualizarPantalla(valor) {
    document.getElementById('resultado').value = valor;
}

// Inicialización
actualizarPantalla('0');
