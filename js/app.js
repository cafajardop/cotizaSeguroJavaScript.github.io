// Constructor
function Seguro(marca, anio, tipo) {
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
}

Seguro.prototype.cotizarSeguro = function () {
    /* 
    1 = americano 1.15
    2 = asiatico 1.05
    3 = europeo 1.35
     */
    let cantidad;
    const base = 2000;

    switch (this.marca) {
        case '1':
            cantidad = base * 1.15;
            break;
        case '2':
            cantidad = base * 1.05;
            break;
        case '3':
            cantidad = base * 1.35;
            break;
    }
    /* Leer el año */
    const diferencia = new Date().getFullYear() - this.anio;
    /* Cada año de diferencia hay que reducir 3 porciento del valor del año */
    cantidad -= ((diferencia * 3) * cantidad) / 100;
    /* 
        Si el seguro es basico por 30 %
        Si el seguro es completo 50%
     */
    if(this.tipo === 'basico'){
        cantidad *=1.30;
    }else{
        cantidad *= 1.50;
    }

    return cantidad; 
}

// Todo lo que se muestra
function Interfaz() {}

// Mensaje que se imprime en el HTML
Interfaz.prototype.mostrarMensaje = function (mensaje, tipo) {
    const div = document.createElement('div');

    if (tipo === 'error') {
        div.classList.add('mensaje', 'error');
    } else {
        div.classList.add('mensaje', 'correcto');
    }

    /* Insertamos el HTML */
    div.innerHTML = `${mensaje}`;
    /* Before toma dos parametros el primero es el elemento donde lo quieres insertar el segundo es antes de que elemento lo quieres insertar */
    formulario.insertBefore(div, document.querySelector('.form-group'));

    setTimeout(function () {
        document.querySelector('.mensaje').remove();
    }, 3000)
};

// Imprime el resultado de la cotizacion
Interfaz.prototype.mostrarResultado = function(seguro, total){
    const resultado = document.getElementById('resultado');
    let marca;
    switch(seguro.marca){
        case '1':
            marca = 'Americano';
            break;
        case '2':
            marca = 'Asiatico';
            break;
        case '3':
            marca = 'Europeo';
            break;
    }
    // Crear div
    const div = document.createElement('div');
    // Insertar informacion
    div.innerHTML = `
        <p class='header'>Tu Resumen: </p>
        <p>Marca ${marca} </p>
        <p>Año: ${seguro.anio} </p>
        <p>Tipo: ${seguro.tipo} </p>
        <p>Total: $ ${total} </p>
    `;
    const spinner = document.querySelector('#cargando img')
    spinner.style.display ='block';
    setTimeout(function() {
        spinner.style.display = 'none';
        resultado.appendChild(div);
   }, 3000);
}

const formulario = document.getElementById('cotizar-seguro');
formulario.addEventListener('submit', function (e) {
    e.preventDefault(); // Es para que no envie el formulario por el action

    /* Leer la marca seleccionada del select */
    const marca = document.getElementById('marca');
    const marcaSelecciona = marca.options[marca.selectedIndex].value; // Retorna el valor seleccionado

    /* Leer el anio seleccionado del <select> */
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;

    // Lee el valor del radio button
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    // Crear una instancia de interfaz 
    const interfaz = new Interfaz();

    // Resivamos que los campos no esten vacios
    if (marcaSelecciona === '' || anioSeleccionado === '' || tipo === '') {
        // Interfaz inpmiendo un errro 
        /* console.log('Faltan Datos'); */
        interfaz.mostrarMensaje('Faltan Dato, revisar formulario y prueba de nuevo', 'error');
    } else {
        // Limpiar resultados anteriores 
        const resultados = document.querySelector('#resultado div');
        if(resultados != null){
            resultados.remove();
        }

        // Instanciar seguro y mostrar interfaz
        /* console.log('Todo correcto'); */
        /* interfaz.mostraError('Todo al peluche','success'); */
        const seguro = new Seguro(marcaSelecciona, anioSeleccionado, tipo);
        // Cotizar seguro○
        const cantidad = seguro.cotizarSeguro();
        // Mostrar el resultado
        interfaz.mostrarResultado(seguro,cantidad);
        interfaz.mostrarMensaje('Cotizando...', 'correcto');
    }
    /*  console.log(anioSeleccionado);
        console.log('Presionando...'); */
});

const   max = new Date().getFullYear(),
        min = max - 20;

const selectAnios = document.getElementById('anio');
// Contruir los años 
for (let i = max; i > min; i--) {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option);
}