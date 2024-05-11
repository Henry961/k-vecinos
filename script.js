//Variable que guarda la cantidad de puntos a insertar en el gráfico
let cantidadPuntos;
//Este arreglo guardara los pares de elementos que se insertaran en el grafico:
//Se guardara en formato de arreglo. Ejemplo: 
//[['leyenda 1', 600],['leyenda 2', 200]]
var arregloDatos = [];

//Funciòn que agregar un punto más
function agregarPunto() {
    //tomo la cantidad de puntos actual
    cantidadPuntos = document.getElementsByClassName("punto").length;
    //Le sumo 1
    cantidadPuntos++;

    //Creo un nuevo elemento div, que contendra los datos nuevos
    const punto = document.createElement("div");
    punto.className = "punto";

    //Creo el input para el valor X y le asigno sus propiedades y clases
    const inputX = document.createElement("input");
    inputX.type = "text";
    inputX.className = "valorX";
    inputX.placeholder = "Valor X " + cantidadPuntos;
    //Agrego el input al div punto
    punto.appendChild(inputX);
    
    //Creo el input para el valor Y y le asigno sus propiedades y clases
    const inputY = document.createElement("input");
    inputY.type = "text";
    inputY.className = "valorY";
    inputY.placeholder = "Valor Y " + cantidadPuntos;
    //Agrego el input al div punto
    punto.appendChild(inputY);

    //Agrego el punto al div datos
    document.getElementById("datos").appendChild(punto);
}

//Función que cargar el gráfico de Google
function cargarGrafico() {
    // Cargo el gráfico de Google
    google.charts.load('current', {
        'packages': ['corechart']
    });
    google.charts.setOnLoadCallback(drawChart);
}

// Dibujo el gráfico y coloco los valores
function drawChart() {
    arregloDatos = [];
    //Recupero los inputs que hay dentro del div datos
    var puntos = document.getElementById("datos").getElementsByClassName("punto");

    //Controlo que todos los input tengan un valor cargado
    for (var i = 0; i < puntos.length; i++) {
        var valorX = puntos[i].getElementsByClassName("valorX")[0].value;
        var valorY = puntos[i].getElementsByClassName("valorY")[0].value;
        
        // Verifico que ambos valores estén presentes
        if (valorX === "" || valorY === "") {
            alert("Cargue todos los campos");
            return;
        }
        
        // Agrego el punto al arreglo de datos
        arregloDatos.push([parseFloat(valorX), parseFloat(valorY)]);
    }

    //Genero la tabla que contiene los datos con el arreglo de datos
    var data = new google.visualization.DataTable();
    data.addColumn('number', 'X');
    data.addColumn('number', 'Y');
    data.addRows(arregloDatos);

    // Opcional; Agrego el título del gráfico
    var options = {
        'width': 600,
        'height': 400
    };

    // Muestro el gráfico dentro del elemento <div> con id="chart_div"
    var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));
    chart.draw(data, options);
}
