var weather = document.getElementById("weather");
var celcius = document.getElementById("degreeNumber");
let weatherIcon = document.getElementById("weather-icon");
let tempMax = document.getElementById("max");
let tempMin = document.getElementById("min");
let temp_ = document.getElementById("degreeNumber");
let feels = document.getElementById("feelsLike");
let humidity = document.getElementById("humidity_");
let status_ = document.getElementById("status"); //seria si esta nublado
let description = document.getElementById("description"); //descripción
let today = new Date(); //crea el objeto de la fecha de hoy
let hour = today.getHours(); //accedo a la hora para la funcion Wallpaper!

let val;

window.onload = () =>{
    wallpaper();
    mirar();
}

function wallpaper(){
    if(hour <= 18 && hour >= 7){
        container.classList.remove("night");
        container.classList.add("day");
    }
    else{
        container.classList.remove("day");
        container.classList.add("night");
        weather.style.color = 'white';
        celcius.style.color = 'white';
        description.style.color = 'white';
    }
}

function changeClima(){

    let city = document.getElementById("ciudad").value;
    let url = "https://api.openweathermap.org/data/2.5/weather?q="+ city +"&appid=3936d0749fdc3124c6566ed26cf11978&units=metric&lang=es";

    fetch(url)
    .then((response) => response.json())
    .then(data => {

    let tempValue = data['main']['temp'];
    let tempMinValue = data['main']['temp_min'];
    let tempMaxValue = data['main']['temp_max'];
    let feelsValue = data['main']['feels_like'];
    let humidityValue = data['main']['humidity'];
    let statusValue = data['weather'][0]['main'];
    let icon = data['weather'][0]['icon'];
    let descriptionValue = data['weather'][0]['description'];

    weatherIcon.innerHTML = `<img src='../icons/${icon}.png'></img>`;
    temp_.innerHTML = tempValue + " °C";
    tempMin.innerHTML = tempMinValue + " °C";
    tempMax.innerHTML = tempMaxValue + " °C";
    feels.innerHTML = feelsValue + " °C";
    humidity.innerHTML = humidityValue + " %";
    status_.innerHTML = statusValue;
    description.innerHTML = descriptionValue;
    weather.style.display = "block";
    })

.catch(error =>console.log(error))
}

function agregarCiudad(){

    //obtenemos datos del input
    var nuevosC = document.getElementById("nombreCiudad").value;

    if(nuevosC!=0){
        //si no hay nada guardado al principio entonces guarda un array vacio
        if(localStorage.getItem('Ciudad') == null){
            localStorage.setItem('Ciudad', "[]");
        } 
        var viejosC = JSON.parse(localStorage.getItem('Ciudad'));
        val = viejosC.includes(nuevosC);

        if(val == false){
            //obtenemos los datos antiguos y se los pegamos al nuevo array (push) 
            viejosC.push(nuevosC);
            //guardamos los datos antiguos + los nuevos en el localstorage
            localStorage.setItem('Ciudad', JSON.stringify(viejosC));
        } else{
            alert("Ciudad ya ingresada");
        }
    } else {
        alert("Ingrese una ciudad");
    }
} 

function mirar(){

    var ciudades = JSON.parse(localStorage.getItem("Ciudad"));

    ciudades.forEach(array => {
        var c = document.createElement('option');
        c.text = array;
        ciudad.appendChild(c);
    })
}