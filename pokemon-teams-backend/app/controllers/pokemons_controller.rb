class PokemonsController < ApplicationController
    def create
        # POST /pokemons
        # Body request => { "trainer_id": 10}
        # print params
        render json: params
        # if Trainer.find(params["trainer_id"]).pokemons.length <= 5
        #     # name = Faker::Name.first_name
        #     # species = Faker::Games::Pokemon.name
        #     # pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params["trainer_id"])
        #     # render json: pokemon
        # else
        #   render json: {"error": "TOO MANY POKEMON"}, status: 406
        # end
      end
    
    def destroy
        pokemon = Pokemon.find(params[:id]);
        pokemon.destroy
        render json: pokemon
    end
end
