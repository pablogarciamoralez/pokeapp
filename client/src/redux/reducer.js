const initialState = {
    pokemons: [],
    allPokemons: [],
    arrayTypes: [],
    detail: [],
    loading: false
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_POKEMONS':
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload,
            }

        case "GET_NAME_POKEMONS":
            return {
                ...state,
                pokemons: action.payload,
            };

        case "POST_POKEMON":
            return {
                ...state,
            };

        case "GET_TYPES":
            return {
                ...state,
                arrayTypes: action.payload,
            };

        case "FILTER_CREATED":
            const allPokemons = state.allPokemons
            const createdFilter = action.payload === "created" ? allPokemons.filter((e) => e.createInDb) : allPokemons.filter((e) => !e.createInDb);
            return {
                ...state,
                pokemons: action.payload === 'all' ? state.allPokemons : createdFilter,
            };

        case "FILTER_TYPES":
            let allFilterTypes = state.allPokemons;
            let filtrar = allFilterTypes.filter((e) =>
                e.types.map((t) => t.name).includes(action.payload)
            );
            return {
                ...state,
                pokemons: filtrar,
            };

        case "ALPHABETICAL_SORT":
            let sortedArr =
                action.payload === "asc"
                    ? state.pokemons.sort(function (a, b) {
                        if (a.name > b.name) {
                            return 1;
                        }
                        if (b.name > a.name) {
                            return -1;
                        }
                        return 0;
                    })
                    : state.pokemons.sort(function (a, b) {
                        if (a.name > b.name) {
                            return -1;
                        }
                        if (b.name > a.name) {
                            return 1;
                        }
                        return 0;
                    });
            return {
                ...state,
                pokemons: sortedArr,
            };

        case "FORCE_SORT":
            let orderFuerza =
                action.payload === "asc"
                    ? state.pokemons.sort(function (a, b) {
                        if (a.attack > b.attack) {
                            return 1;
                        }
                        if (b.attack > a.attack) {
                            return -1;
                        }
                        return 0;
                    })
                    : state.pokemons.sort(function (a, b) {
                        if (a.attack > b.attack) {
                            return -1;
                        }
                        if (b.attack > a.attack) {
                            return 1;
                        }
                        return 0;
                    });
            return {
                ...state,
                pokemons: orderFuerza,
            };

        case "GET_DETAILS":
            return {
                ...state,
                detail: action.payload,
            };
        case 'RESET':
            return {
                ...state,
                detail: [],

            }

        case 'SEARCH_BY_NAME_LOADING':
            return {
                ...state,
                loading: action.payload
            }   
        default:
            return state
    }
}