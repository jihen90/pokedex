$(document).ready(function () {
    let endpoint = 'https://pokeapi.co/api/v2/pokemon/'
    fetchPokemons();

    $('#nexto').click((e) => {
        e.preventDefault();
        $('#pokemons').html('');
        fetchPokemons();
    })

    function fetchPokemons() {
        $.ajax({
            url: endpoint,
            dataType: 'json',
            method: 'GET',
            success: function(data) {
                endpoint = data.next;
                data.results.forEach(function(pokemon){
                    let monster = `
                    <div class="card img-fluid col-4" >
                        <div class="container">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/${pokemon.url.split('/')[6]}.png" class="card-img-top" alt="...">
                            <div class="card-body text-center">
                                <h3 class="card-title">${pokemon.name}</h3>
                                <a href="#" id="${pokemon.name}-${pokemon.url.split('/')[6]}" class="btn btn-outline-primary">¡Quiero saber más de este pokémon</a>
                            </div>
                        </div>
                    </div>`
                    $('#pokemons').append(monster);

                    $(`#${pokemon.name}-${pokemon.url.split('/')[6]}`).click((e) => {
                        e.preventDefault();
                        $('#diModal').modal('show');
                        $('#pokemonName').html(pokemon.name);
                        $('#pokeName').html(`Nombre:  ${pokemon.name}`);
                        //ajax dentro del evento click
                        $.ajax({
                            url: pokemon.url,
                            dataType: 'json',
                            method: 'GET',
                            success: function(pokemonsito) {
                                $('#abilities').html(getAbilities(pokemonsito))
                                $('#pokeTypes').html(getPokeTypes(pokemonsito))
                                $('#firstFiveMoves').html(getPokeMoves(pokemonsito))
                            }
                        })

                    })
                })
            }
        })
    }

    function getAbilities(pokemon) {
        let abi = 'Abilities : '
        pokemon.abilities.forEach(function(ability){
            abi += ` ${ability.ability.name}`
        })
        return abi;
    }


    function getPokeTypes(pokemon) {
        let types = 'Types : '
        pokemon.types.forEach(function(type){
            types += ` ${type.type.name}`
        })
        return types;
    }

    function getPokeMoves(pokemon) {
        let move = 'Moves : '
        pokemon.moves.forEach(function(movesito, index){
            if (index < 5) {
                move += ` ${movesito.move.name}`
            }
        })
        return move;
    }


});
