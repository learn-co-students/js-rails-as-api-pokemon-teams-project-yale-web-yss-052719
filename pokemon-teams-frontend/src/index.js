const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

// let card = document.createElement("div");
// card.className = "card";
// card["data-id"] = 

function getTrainers() {
    return fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(trainers => {
        console.log(trainers);
        let mainContainer = document.querySelector("main");
        trainers.forEach(trainer => {
            let card = createTrainerCard(trainer);
            // console.log(card);
            mainContainer.appendChild(card);
        })
    })
    .catch(error => {
        console.log(error.message);
    })
}

getTrainers();

function createTrainerCard (trainer) {
    let card = document.createElement("div");
    card.className = "card";
    card["data-id"] = trainer.id;

    let trainerName = document.createElement("p");
    trainerName.innerText = trainer.name;
    let trainerUl = document.createElement("ul");
    trainer.pokemons.forEach(pokemon => {
        // console.log(pokemon);
        trainerUl.appendChild(createPokemonLi(pokemon))
    })
    card.appendChild(trainerName);
    card.appendChild(trainerUl);

    

    let addPokemonButton = document.createElement("button");
    addPokemonButton["data-trainer-id"] = trainer.id;
    addPokemonButton.innerText = "Add Pokemon";

    addPokemonButton.addEventListener("click", () => {
        let configObj = {
            method: "POST",
            headers: {
                'Content-Type': 'applications/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                trainer_id: trainer.id
            })
        }
        fetch(POKEMONS_URL, configObj)
        .then(res => res.json())
        .then(pokemon => {
            console.log(pokemon);
            trainerUl.appendChild(createPokemonLi(pokemon))
        })

    });

    card.appendChild(addPokemonButton);
    return card;
}

function createPokemonLi(pokemon) {
    let pokemonLi = document.createElement("li");
    pokemonLi.innerText = pokemon.nickname + " (" + pokemon.species + ")";
    let releaseButton = document.createElement("button");
    releaseButton.className = "release";
    releaseButton["data-pokemon-id"] = pokemon.id;
    releaseButton.innerText = "Release";

    releaseButton.addEventListener("click", () => {
        deletePokemon(pokemon);
        releaseButton.parentNode.remove();
    })

    
    pokemonLi.appendChild(releaseButton);
    return pokemonLi;
}

function deletePokemon(pokemon) {
    let configObj = {
        method: "DELETE",
        header: {
            'Content-Type': 'application/json'
        }
    }
    return fetch(`${POKEMONS_URL}/${pokemon.id}`, configObj)
    .then(resp => resp.json())
    .then(pokemon => {
        console.log(pokemon);

    })
}




