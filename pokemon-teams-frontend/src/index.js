const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function() {
    console.log('hi')

    // GET TRAINERS
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainers => {
        const main = document.querySelector("main")
        trainers.forEach(trainer => {
            let div = document.createElement("div")
            div.className = "card"
            div.dataset.id = trainer.id
            let p = document.createElement("p")
            p.innerText = trainer.name
            let button = document.createElement("button")
            button.dataset.trainerId = trainer.id
            button.innerText = "Add Pokemon"
            let ulTag = document.createElement("ul")
            trainer.pokemons.forEach(pokemon => {
                ulTag.innerHTML += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>`
            });
            div.appendChild(p)
            div.appendChild(button)
            div.appendChild(ulTag)
            main.appendChild(div)
        });
    })

    document.addEventListener("click", function(e) {
        // RELEASE POKEMON
        if (e.target.tagName === "BUTTON" && e.target.className === "release")
            fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, {
                method: "DELETE"
            }).then(data => {
                e.target.parentElement.remove()
            })
        
        // ADD POKEMON
        else if (e.target.tagName === "BUTTON" && e.target.innerText === "Add Pokemon") {
            fetch(POKEMONS_URL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    "trainer_id": e.target.dataset.trainerId
                })
            }).then(resp => resp.json())
            .then(pokemon => {
                const ulTag = e.target.parentElement.children[2]
                ulTag.innerHTML += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id=${pokemon.id}>Release</button></li>`
            })
        }
    })
})