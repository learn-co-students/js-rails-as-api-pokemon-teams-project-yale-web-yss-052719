class TrainersController < ApplicationController

    def index 
        trainers = Trainer.all
        render json: trainers, include: [:pokemons]
    end


    def update
        trainer = Trainer.find(:id)
        trainer.update(trainer_params)

        render json: trainer, include: [:pokemons]
    end

    # def create 
    #     pokemon = Pokemon.create(pokemon_params)
    #     render json: pokemon
    # end 

    # def destroy
    #     pokemon = Pokemon.find(:id)
    #     pokemon.destroy
    #     render json: {}
    # end



    private
    def trainer_params
        params.permit(:name)
    end

end
