const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", function(){
  const mainBody = document.querySelector("main")
  fetch(TRAINERS_URL)
  .then(response => response.json())
  .then(data => {
    for(let i =0; i < data.length; i++){
      mainBody.innerHTML +=
        `<div class="card" data-id=${data[i].id}><p>${data[i].name}</p>
        <button class="add-btn" data-trainer-id=${data[i].id}>Add Pokemon</button>
        <ul class="pokemon-here"></ul>
        </div>`
        // let ulTag = document.querySelector(".put-pokemon-here")
        // ulTag.innerHTML += `<li>${data[i].pokemons[j].nickname}(${data[i].pokemons[j].species})</li>`
      }
      let ulTags = document.getElementsByClassName("pokemon-here")
      for(let i =0; i < data.length; i++){
        for (let j = 0; j < data[i].pokemons.length; j++){
          ulTags[i].innerHTML += `<li>
          ${data[i].pokemons[j].nickname} (${data[i].pokemons[j].species})
          <button class="release" data-pokemon-id=${data[i].pokemons[j].id}>Release</button>
          </li>`
      }
    }
    })
    document.addEventListener('click', function(e){
      if (e.target.tagName === "BUTTON" && e.target.className === "add-btn") {
        fetch(POKEMONS_URL, {
          method: "POST",
          header: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            trainer_id: e.target.dataset.trainerId
          })
        })
        .then(resp => resp.json())
        .then(data => {
          // console.log(e.target.dataset.trainerId)
          let ulTag = e.target.parentElement.parentElement
          ulTag.innerHTML +=
          `<li>
          ${data.nickname} (${data.species})
          <button class="release" data-pokemon-id=${data.id}>Release</button>
          </li>`
        })
      }
    })
  })
