class PokemonsController < ApplicationController

    def create
    newPokemon = Pokemon.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer_id: params[:trainer_id].to_i) 
    render json: newPokemon
    end

    def destroy
    deadPokemon = Pokemon.find(params[:id])
    deadPokemon.destroy
    end

end
