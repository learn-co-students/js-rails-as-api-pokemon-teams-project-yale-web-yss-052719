const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function(){
    fetch('http://localhost:3000/trainers', {
    
    headers: {
        "Content-Type": 'application/json',
        'Accept': 'application/json'
    }

}).then(response => response.json()).then(trainers => {

    mainEl = document.querySelector("main")

    for (let trainer of trainers){
        divEl = document.createElement("div")
        divEl.className = "card"
        divEl.innerHTML = `<p>${trainer.name}</p>
                            <button class= "add" data-trainer-id="${trainer.id}">Add Pokemon</button>
                            <ul></ul>`
        ulEl = divEl.children[2]

        for (let pokemon of trainer.pokemons){
            liEl = document.createElement("li")
            liEl.innerHTML = `${pokemon.nickname} (${pokemon.species})
                                <button class="release" data-pokemon-id="${pokemon.id}">Release</button>`
            ulEl.append(liEl)
        }
        mainEl.append(divEl)

    }
})
})

document.addEventListener('click', function(e){
    if(e.target.className === "add"){
        let ulEl = e.target.nextElementSibling
        let tId = e.target.dataset.trainerId
        
        fetch("http://localhost:3000/pokemons", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                "trainer_id": tId
            })
        }).then(response => response.json())
        .then(newPokemon => {
            console.log(newPokemon)
            liEl = document.createElement("li")
            liEl.innerHTML = `${newPokemon.nickname} (${newPokemon.species})
                                <button class="release" data-pokemon-id="${newPokemon.id}">Release</button>`
            ulEl.append(liEl)
        })
    }

    else if(e.target.className === "release"){
        fetch(`http://localhost:3000/pokemons/${e.target.dataset.pokemonId}`, {
            method: "DELETE"
        }).then(data => {
            e.target.parentElement.remove()
        })
    }
})
