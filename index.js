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


function error(err){
    alert("Not Found") 
    
}




  function imprimir(texto){ //callback
    let usuarioGit= JSON.parse(texto);
    console.log(usuarioGit)
  }


let usuarioPrueba = document.getElementById("input__usuario").value


let button = document.querySelector(".btn__user")
document.querySelectorAll(".btn__user")[0].addEventListener('click', () => {
    usuarioPrueba = document.getElementById("input__usuario").value;
    httpGet("https://api.github.com/users/" + usuarioPrueba, function(response){
    imprimir(response)
})

    //httpPost("https://api.github.com/users?since=135", response)
})