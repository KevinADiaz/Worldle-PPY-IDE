const diccionario = ["VAMOS","AHORA","ESTOY","TENGO","ESTÁS","PUEDO","TIENE","BUENO","HACER","TODOS","PUEDE","SABES","QUIÉN","NUNCA","DÓNDE","FAVOR","SEÑOR","MEJOR","ESTÁN","USTED","MUCHO","HASTA","SOBRE","DECIR","COSAS","ANTES","ESTAR","NOCHE","NADIE","PADRE","GENTE","DONDE","MISMO","HECHO","ELLOS","CLARO","ESTAS","LUGAR","MUNDO","AMIGO","DESDE","FUERA","TENER","CREES","BUENA","GUSTA","NUEVO","HABÍA","MENOS","TENÍA","MADRE","QUIEN","LUEGO","TODAS","MUJER","VISTO","HACES","TARDE","PARTE","HABER","SABER","VECES","TANTO","RAZÓN","QUIZÁ","ESTOS","SALIR","HEMOS","CHICA","ENTRE","ALGÚN","SERIO","SOMOS","PENSÉ","DEBES","FORMA","CHICO","DICHO","NUEVA","SABÍA","AYUDA","HACIA","MIEDO","ADIÓS","PODER","NIÑOS","SERÍA","VIEJO","MANOS","PASAR","VIENE","HORAS","LISTO","ÚNICO","CERCA","OTROS","SIGUE","HABLA","FELIZ","LLAMA","VENIR","MORIR","ATRÁS","DICES","ABAJO","DEJAR","TOMAR","JUSTO","JUEGO","MATAR","CINCO","DICEN","CLASE","PUEDA","IGUAL","VENGA","CREER","SABEN","HAGAS","COMER","PUNTO","MISMA","VIVIR","QUEDA","HIJOS","MAYOR","HACEN","MEDIO","BASTA","MESES","FÁCIL","FINAL","LISTA","TRATA","ARMAS","PODÍA","PERRO","FUEGO","MURIÓ","VERTE","CULPA","VERAS","JUGAR","JOVEN","TENGA","ÚNICA","LEJOS","DIGAS","VEMOS","TRATO","JAMÁS","FALTA","LLEVA","GUSTO","COCHE","MUCHA","CIELO","HABRÁ","ORDEN","DEBEN","LIBRO","CALLE","CLARK","LIBRE","VISTE","LLAMO","SUEÑO","VIAJE","PETER","RESTO","AVIÓN","FRANK","NEGRO","MIREN","HARÍA","ACABA","OTRAS","DOLOR","DEMÁS","PONER","TONTO","CAMPO","ACABÓ","SITIO","VERLO","ERROR","LLEGÓ","MENTE","NOVIA","SUENA","HARRY","HAZLO","GRUPO","PERRA","ACABO","TRAJE","JAMES","LARGO","ENTRA","LÍNEA","BARCO","GANAR","MITAD","LINDO","PAGAR","FOTOS","POBRE","TIPOS","DARLE","AMIGA","VISTA","SALVO","HOTEL","SEÑAL","LLEVO","ELLAS","HONOR","CORRE","JIMMY","HABLO","MEDIA","ESTAN","LINDA","NORTE","BUSCA","SIETE","LLAVE","SANTO","IRNOS","VAYAS","SALIÓ","PELEA","BANCO","CALMA","CREEN","HACÍA","NOVIO","DECÍA","DESEO","CARNE","VIDAS","JESÚS","CREÍA","CARTA","ESTÉS","DAVID","QUISE","AMBOS","DULCE","VAYAN","VUELO","HARÁS","JUNTO","DIRÍA","SUELO","LLEGA","VERÁS","PRISA","SEGÚN","BROMA","SACAR","PAPEL","LLAMÓ","HAGAN","DEJES","DUELE","CAUSA","LUCES","OJALÁ","RADIO","BRAZO","CARGO","HOGAR","CORTE","BAILE","VIEJA","RAYOS","SERÁS","SALUD","PARAR","CENAR","SERÁN","VOLAR","NIVEL","BOLSA","ACASO","MIRAR","SALGA","PERDÍ","SANTA","MILES","BOMBA","DARME","VERLA","TOCAR","GANAS","PEDIR","PISTA","SIRVE","DOBLE","ESTÉN","DEBÍA","EDDIE","COLOR","AQUEL","FONDO"];
let PalabrasIntentadas = [];
let intentos = 6;
let palabra
fetch('https://random-word-api.herokuapp.com/word?length=5&lang=es')
    .then(response => response.json())
    .then(response => {
        palabra = response[0].toUpperCase();
    })
    .catch(err => { // por si falla el ide
        palabra = diccionario[Math.floor(Math.random() * diccionario.length)];;
    });
function terminar(mensaje){
    const INPUT = document.getElementById("guess-input");
    const BOTON = document.getElementById("guess-button");
    INPUT.disabled = true;
    BOTON.disabled = true;
    let contenedor = document.getElementById('guesses');
    contenedor.innerHTML = mensaje;
}
function leerintento() {
    const intento= document.getElementById("guess-input").value;
    const valor = intento.toUpperCase();
    return valor;
}
function intentar() {
    const INTENTO = leerintento()
    const GRID = document.getElementById("grid");
    const ROW = document.createElement('div');
    ROW.className = 'row';
    if (PalabrasIntentadas.includes(INTENTO)){ /* Para evitar poner una misma palabra 2 veces*/
        alert('¡Ya probaste esa palabra!')
        return
    }
    else {
        PalabrasIntentadas.push(INTENTO)
        for (let i in palabra) {
            const SPAN = document.createElement('span');
            SPAN.className = 'letter';
            if (INTENTO[i]=== palabra[i]) {
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = '#79B851' ;
            } else if (palabra.includes(INTENTO[i])) {
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = '#F3C237';
            } else {
                SPAN.innerHTML = INTENTO[i];
                SPAN.style.backgroundColor = '#A4AEC4';
            }
            ROW.appendChild(SPAN)
        }
        GRID.appendChild(ROW)
        if (INTENTO === palabra){
            terminar("<h1>GANASTE!😀</h1>")
            return
        }
        intentos --
        if (intentos===0) {
            terminar("<h1>PERDISTE!😖</h1>")
            alert("la respuesta era "+ palabra)
        }
    }}
document.getElementById("guess-button").addEventListener('click',()=>{
    let INTENTOlongitud = leerintento().length
    if (INTENTOlongitud === 5){
        intentar()
    }
    else{alert('La palabra debe tener 5 letras')} //evitar que se usen palabras de menos de 5 letras
})