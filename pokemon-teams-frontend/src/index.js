const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const trainerList = document.querySelector('main')


document.addEventListener('DOMContentLoaded', function() {
    // fetch all trainers and pokemon by accessing the trainers index
    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(data => {

        data.forEach(trainer => {    
            // first, create a ul list of a trainer's pokemon
            let ulTag = document.createElement('ul')
            trainer.pokemons.forEach(pokemon => {
                let liTag = document.createElement('li')
                liTag.innerHTML = `${pokemon.nickname} (${pokemon.species}) <button class="btn release" data-pokemon-id=${pokemon.id}>Release</button>`
                ulTag.appendChild(liTag)
            })

            // then, create a card and insert the list
            let card = document.createElement('div')
            card.className = "card"
            card.dataset.id = trainer.id
            
            card.innerHTML = `<p>${trainer.name}</p>
            <button class="btn add-pokemon" data-trainer-id=${trainer.id}>Add pokemon</button>
            `
            card.appendChild(ulTag)
            trainerList.appendChild(card)
        })
    })

    // add functionality for adding pokemon

    trainerList.addEventListener('click', function(event) {
        if(event.target.className === "btn add-pokemon") {
            fetch(POKEMONS_URL, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                    "trainer_id": event.target.dataset.trainerId
                })
            })
            .then(response => response.json())
            .then(data => {
                let liTag = document.createElement('li')
                liTag.innerHTML = `${data.nickname} (${data.species}) <button class="btn release" data-pokemon-id=${data.id}>Release</button>`
                
                let card = event.target.parentElement
                let ulTag = card.querySelector('ul')
                ulTag.appendChild(liTag)
            })
        }

        // add functionality for releasing pokemon
        else if(event.target.className === "btn release") {
            fetch(`http://localhost:3000/pokemons/${event.target.dataset.pokemonId}`, {
                method: "DELETE"
            })
            .then(data => {
                event.target.parentElement.remove()
            })
        }
    })

    


})
