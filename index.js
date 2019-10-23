function httpGet(theUrl, callback) {

    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
        else if (xmlHttp.readyState == 4)
            error(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl);
    xmlHttp.setRequestHeader("X-Requested-With", "XMLHttpRequest")
    xmlHttp.send();
}

function error(err){ //pegar tercer que NO es un alert
    limpiaPantalla();
    document.getElementById("tablaTres").className = document.getElementById("tablaTres").className.replace(" d-none", "")

}

function limpiaPantalla () {
    if(document.getElementById("tablaUno").className.indexOf("d-none") === -1) 
        document.getElementById("tablaUno").className += " d-none"

    if(document.getElementById("tablaUno").className.indexOf("d-none") === -1) 
        document.getElementById("tablaDos").className += " d-none"

    if(document.getElementById("tablaUno").className.indexOf("d-none") === -1) 
        document.getElementById("tablaTres").className += " d-none"
}


function buscaUsuario(){
    let user = document.querySelector("#input__usuario").value
    httpGet("https://api.github.com/users/" + user, imprime)
    
} 

function imprime(texto){ //callback
    let usuario = JSON.parse(texto);
    console.log(usuario)


    limpiaPantalla();
    document.getElementById("tablaDos").className = document.getElementById("tablaDos").className.replace(" d-none", "")

    let user = document.querySelector("#input__usuario").value
    // let avatar = usuario.avatar_url
    // document.querySelector("#imagen") = avatar

    let imagen = document.querySelector("#imagenCarta");
    imagen.src= usuario.avatar_url

    let nombreLogin = usuario.login
    document.querySelector("#username").innerHTML = nombreLogin

    let nombreBio = usuario.bio
    document.querySelector("#userBio").innerHTML = nombreBio

    let nombreUsuario = usuario.name
    document.querySelector("#nombreUser").innerHTML = nombreUsuario
    
    //console.log(usuario.bio)
    //console.log(usuario.name)
    //console.log(nombreLogin)

    httpGet("https://api.github.com/users/" + user + "/repos", imprimeRepos)
}


function consultarDatos(repos) {

    repos.forEach(  (repo) => {
        let rowRepos = `<tr><th scope="row">${repo.name}</th><td><i class="fas fa-star"></i>${repo.watchers_count}<i class="fas fa-code-branch"></i>${repo.forks_count}</td></tr>`
        document.querySelector("#datosRepos").innerHTML += rowRepos
    });

}

function imprimeRepos(texto) {
    let repos = JSON.parse(texto);
    console.log(repos)
    consultarDatos(repos)
  
}   


let arrBotonBuscar = document.querySelectorAll(".botonSearch")
arrBotonBuscar.forEach( (botonBuscar) => {
    botonBuscar.addEventListener("click", buscaUsuario);
});



