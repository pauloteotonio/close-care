export interface PokemonListModel {
    id?: number;
    imageUrl: string;
    name: string;
    abilities: string[];
    types: string[];
}

export interface AbilityModel {
    ability: {
        name: string;
    };
}

interface TypeModel {
    type: {
        name: string;
    };
}

export interface PokemonModel {
    name: string;
    abilities: AbilityModel[];
    types: TypeModel[];
    id?: number;
}