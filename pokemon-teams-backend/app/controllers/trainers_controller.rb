class TrainersController < ApplicationController
    def index
        trainers = Trainer.all
        render json: trainers.map {|t| t.serialized }
    end
end
