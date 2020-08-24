class PokemonsController < ApplicationController

  def create
    name = Faker::Name.first_name
    species = Faker::Games::Pokemon.name
    pokemon = Pokemon.create(nickname: name, species: species, trainer_id: pokemon_params["trainer_id"])
    render json: pokemon, only: [:nickname, :species, :trainer_id]
  end

  def destroy
    pokemon = Pokemon.find(params[:id])
    pokemon.destroy
    render json: pokemon, only: [:nickname, :species, :trainer_id]
  end


  private

  def pokemon_params
    params.permit(:trainer_id)
  end
end
