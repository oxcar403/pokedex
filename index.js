const url = "https://pokeapi.co/api/v2/pokemon/";
const pokemon = document.getElementById("nombre-pokemon");
const botonBuscar = document.getElementById("buscar-pokemon");
const botonBorrar = document.getElementById("borrar-pokemon");
const tarjeta = document.getElementById("tarjeta");

//para computadora
botonBuscar.addEventListener("click", llamandoPokemon);
botonBorrar.addEventListener("click", borrarPokemon);

//para celular y tablet
botonBuscar.addEventListener("touchstart", llamandoPokemon);
botonBorrar.addEventListener("touchstart", borrarPokemon);


function llamandoPokemon (){
    console.log("presionaste la lupa");
    window.fetch(`${url}${pokemon.value.toLowerCase()}`)//haciendo petición a pokeapi con valoree en minusculas
        .then (response =>{
            if (response.status == 404){//en caso deobtener una respuesta de inexistencia del pokemon arrojara ale mensae de alert
                alert("Pokemon no existente, intenta con otro");
            }else{
                return response.json();//si existe el pokemon el navegador ahora entedera en su lenguaje lo que he traido de la API
            }
        })
        .then (responseJSON =>{//Manipulo la información que obtengo del .json 
            let informacionPokemon = [];

            let resultado = [];

            for(let indexPokemon in responseJSON){
                resultado.push([indexPokemon, responseJSON[indexPokemon]])
            }
            console.table(resultado);

            //trayendo la imagen y creando etiqueta img
            let imagenPokemon = document.createElement("img")
            imagenPokemon.src = resultado[14][1].front_default

            //trayendo el id y nombre pokemon del arreglo resultado
            let pokemonNombre = document.createElement("h2");
            pokemonNombre.innerText = `Name: ${resultado[10][1]} Id: ${resultado[6][1]}`


            //trayendo tipo pokemon del arreglo resultado
            let tipoPokemon =document.createElement("h2");
            tipoPokemon.innerText = `Tipo: ${resultado[16][1][0].type.name}`

            //tarjeta con datos 
            let contenedor = document.createElement("div");
            contenedor.append(imagenPokemon, pokemonNombre, tipoPokemon)

            //Pasndo la información del contenedor al arrreglo de informacionPokemon
            informacionPokemon.push(contenedor)

            //al id="tarjeta" de html se le va a pasar informacionPokemon
            tarjeta.append(...informacionPokemon)
        })

        

}

function borrarPokemon(){
    console.log("presionaste la x");
    let pokemones = tarjeta.childNodes//mi lista la tranformo en un arreglo para poder manipular y borrarla
    pokemones = Array.from(pokemones)

    pokemones.forEach(pokemon =>{//itero mi arreglo para poder eliminar el pokemon 
        pokemon.remove(pokemon)
    })
}