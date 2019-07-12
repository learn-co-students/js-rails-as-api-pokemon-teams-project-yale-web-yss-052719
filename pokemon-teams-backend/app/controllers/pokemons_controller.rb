class PokemonsController < ApplicationController
    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        pokemon = Pokemon.create(species: species, nickname: name, trainer_id: params[:trainer_id])
        render json: pokemon
    end
    
    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
    end

    private
    
    # def pokemon_params
    #     name = Faker::Name.first_name
    #     species = Faker::Games::Pokemon.name
    #     params.permit(:species, :nickname, :trainer_id)
    # end
end
