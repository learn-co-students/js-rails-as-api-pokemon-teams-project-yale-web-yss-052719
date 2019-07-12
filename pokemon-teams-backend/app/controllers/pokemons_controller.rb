require 'faker'
class PokemonsController < ApplicationController


    def index 
        pokemons = Pokemon.all
        render json: pokemons
    end

    def create 
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: params[:trainer_id])
        render json: pokemon
    end 

    def update
        pokemon = Pokemon.find(params[:id])
        pokemon.update(pokemon_params)

        render json: pokemon
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
    end



    private
    def pokemon_params
        params.permit(:species, :nickname, :trainer_id)
    end

   

end
