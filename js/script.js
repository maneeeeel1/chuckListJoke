
const btnchiste = document.getElementById("fetchJoke")
const lista = document.getElementById("jokeList")


function obtenerchistes(){
    const chistespagina = JSON.parse(localStorage.getItem("chistes")) || [];
    lista.innerHTML = chistespagina.map(chiste =>
        `<li>
            <div class="diseño">
                <p>${chiste}</p>
                <button class="eliminar">Eliminar</button>
            </div>
        </li>`
    ).join("");

    document.querySelectorAll(".eliminar").forEach((btn, index)=> {
        btn.addEventListener("click", () => eliminarchistes(index));
    })

}

function paginachistes() {
    fetch("https://api.chucknorris.io/jokes/random")
    .then((response) =>{
        if(!response.ok){
            throw new Error ("No funciona!!")
        }else{
            return response.json();
        }
    }).then((data) =>{
        const nuevochiste = data.value;

        let guardarchistes = JSON.parse(localStorage.getItem("chistes")) || [];
        guardarchistes.push(nuevochiste);
        localStorage.setItem("chistes", JSON.stringify(guardarchistes));
        obtenerchistes();
})
}

function eliminarchistes(index){
    let chistes = JSON.parse(localStorage.getItem("chistes")) || [];
    index = parseInt(index, 10);
    chistes.splice(index, 1);
    localStorage.setItem("chistes", JSON.stringify(chistes));
    obtenerchistes();
}

obtenerchistes();



btnchiste.addEventListener("click", paginachistes)

