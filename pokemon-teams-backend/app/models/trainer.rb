class Trainer < ApplicationRecord
    has_many :pokemons
    def serialized
        attributes = self.attributes;
        attributes["pokemons"] = self.pokemons.map{|pokemon| pokemon.attributes};
        attributes
    end
end
