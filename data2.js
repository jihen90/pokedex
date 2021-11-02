$(document).ready(function () {
    let endpoint = 'https://pokeapi.co/api/v2/pokemon/'
    fetchPokemons();

    $('#buttonToNext').click((e) => {
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
                    let infoPokemon = `
                    <div class="card img-fluid col-4" >
                        <div class="container">
                            <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url.split('/')[6]}.png" class="card-img-top" alt="...">
                            <div class="card-body text-center">
                                <h3 class="card-title">${pokemon.name}</h3>
                                <a href="#" id="${pokemon.name}-${pokemon.url.split('/')[6]}" class="btn btn-outline-primary">¡Quiero saber más de este pokémon</a>
                            </div>
                        </div>
                    </div>`
                    $('#pokemons').append(infoPokemon);

                    $(`#${pokemon.name}-${pokemon.url.split('/')[6]}`).click((e) => {
                        e.preventDefault();
                        $('#modal').modal('show');
                        $('#pokemonName').html(pokemon.name);
                        $('#pokeName').html(`Nombre:  ${pokemon.name}`);
                        //ajax dentro del evento click
                        $.ajax({
                            url: pokemon.url,
                            dataType: 'json',
                            method: 'GET',
                            success: function(forPokemon) {
                                $('#abilities').html(getAbilities(forPokemon))
                                $('#pokeTypes').html(getPokeTypes(forPokemon))
                                $('#firstFiveMoves').html(getPokeMoves(forPokemon))
                            }
                        })

                    })
                })
            }
        })
    }

    function getAbilities(pokemon) {
        let abi = 'Habilidades : '
        pokemon.abilities.forEach(function(ability){
            abi += ` ${ability.ability.name}`
        })
        return abi;
    }


    function getPokeTypes(pokemon) {
        let types = 'Tipo : '
        pokemon.types.forEach(function(type){
            types += ` ${type.type.name}`
        })
        return types;
    }

    function getPokeMoves(pokemon) {
        let move = 'Movimientos(5) : '
        pokemon.moves.forEach(function(forMove, index){
            if (index < 5) {
                move += ` ${forMove.move.name}`
            }
        })
        return move;
    }


});
