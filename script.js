//Función que cargar el gráfico de Google
function cargarGrafico() {

    var puntos = document.getElementById("datos").getElementsByClassName("punto");

    var valorX = puntos[0].getElementsByClassName("valorX")[0].value;
    var valorY = puntos[0].getElementsByClassName("valorY")[0].value;

    if(valorX == "" || valorY == ""){
        //Validacion de datos ingresados
        alert("Ingrese los datos");
    }else{
        // Cargo el gráfico de Google
        google.charts.load('current', {
            'packages': ['corechart']
        });
        google.charts.setOnLoadCallback(drawChart(valorX, valorY));
    }
    
}

// Dibujo el gráfico y coloco los valores
function drawChart(valorX, valorY) {
    
    var contadorA=0, contadorB=0;
    
    // Creo el arreglo de datos
    const datosPlanoCartesiano = new Map([
        [1, {x: 8, y: 17, sector: "A"}],
        [2, {x: 23, y: 40, sector: "A"}],
        [3, {x: 4, y: 9, sector: "A"}],
        [4, {x: 12, y: 32, sector: "A"}],
        [5, {x: 19, y: 22, sector: "A"}],
        [6, {x: 3, y: 37, sector: "A"}],
        [7, {x: 15, y: 13, sector: "A"}],
        [8, {x: 11, y: 28, sector: "A"}],
        [9, {x: 23, y: 5, sector: "A"}],
        [10, {x: 1, y: 45, sector: "A"}],
        [11, {x: 18, y: 2, sector: "A"}],
        [12, {x: 9, y: 26, sector: "A"}],
        [13, {x: 6, y: 43, sector: "A"}],
        [14, {x: 22, y: 18, sector: "A"}],
        [15, {x: 13, y: 31, sector: "A"}],
        [16, {x: 32, y: 25, sector: "B"}],
        [17, {x: 37, y: 49, sector: "B"}],
        [18, {x: 46, y: 11, sector: "B"}],
        [19, {x: 50, y: 36, sector: "B"}],
        [20, {x: 39, y: 7, sector: "B"}],
        [21, {x: 45, y: 20, sector: "B"}],
        [22, {x: 34, y: 41, sector: "B"}],
        [23, {x: 36, y: 15, sector: "B"}],
        [24, {x: 43, y: 28, sector: "B"}],
        [25, {x: 47, y: 9, sector: "B"}],
        [26, {x: 38, y: 34, sector: "B"}],
        [27, {x: 42, y: 2, sector: "B"}],
        [28, {x: 40, y: 48, sector: "B"}],
        [29, {x: 44, y: 19, sector: "B"}],
        [30, {x: 35, y: 23, sector: "B"}]
    ]);
    
    // Obtener el último índice en el mapa
    const ultimoIndice = datosPlanoCartesiano.size + 1;

    // Crear el nuevo objeto con los valores de valorX y valorY
    const nuevoDato = { x: parseFloat(valorX), y: parseFloat(valorY), sector: "" };

    // Agregar el nuevo elemento al mapa usando el último índice como clave
    datosPlanoCartesiano.set(ultimoIndice, nuevoDato);

    var arregloDatos = [];

    // Agrego los puntos del nuevoMapa al arreglo de datos
    datosPlanoCartesiano.forEach((value, key) => {
        arregloDatos.push([value.x, value.y]);
    });

    // Genero la tabla que contiene los datos con el arreglo de datos
    // var data = new google.visualization.DataTable();
    // data.addColumn('number', 'X');
    // data.addColumn('number', 'Y');
    // data.addRows(arregloDatos);

    var options = {
        'width': "100%",
        'height': "700"
    };

    // Muestro el gráfico dentro del elemento <div> con id="chart_div"
    // var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));
    // chart.draw(data, options);

    var arrayDistancia = [];

    datosPlanoCartesiano.forEach((value, key) => {

        var distancia = Math.sqrt((valorX-value.x)**2+(valorY-value.y)**2);

        arrayDistancia.push([distancia, value.sector]);

    });

    arrayDistancia.sort((a, b) => a[0] - b[0]);

    for(i=0;i<13;i++){
        if(arrayDistancia[i][1] == "A"){
            contadorA++;
        }else{
            contadorB++;
        }
    }

    // Obtener el elemento con id "texto"
    // var textoElement = document.getElementById("respuesta");

    if(contadorA > contadorB){
        // Modificar el contenido del elemento
        respuestaSector = "A";
        // textoElement.innerHTML = "Pertenece al sector A, teniendo " + contadorA + " en A y " + contadorB + " en B";
        
    }else{
        // Modificar el contenido del elemento
        respuestaSector = "B";
        // textoElement.innerHTML = "Pertenece al sector B, teniendo " + contadorB + " en B y " + contadorA + " en A";
    }

    return respuestaSector;

}

module.exports = drawChart;