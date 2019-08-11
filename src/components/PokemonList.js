import React from "react";
import PokemonListContainer from "../containers/PokemonListContainer";
import PokemonType from "./PokemonType";
import PokemonTypeContainer from "../containers/PokemonTypeContainer";
import PokemonCard from "./PokemonCard";

class PokemonList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      input: ""
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.displayPokemon = this.displayPokemon.bind(this);
  }

  handleSearch(e) {
    var value = e.target.value;

    this.setState({ input: value });

    clearTimeout(this.myTimeout);

    this.myTimeout = setTimeout(() => {
      const { pokemon } = this.props;

      // filter pokemon from pokedex based on user_input
      var filtered_pokemon = pokemon.pokedex.filter(function(pk) {
        var pk_name = pk.pokemon_species.name.toLowerCase();
        var user_input = value.toLowerCase();

        if (pk_name.indexOf(user_input) !== -1) {
          return pk;
        }
      });

      if (value === "") {
        this.props.update_queried_pokemon([]);
      } else {
        this.props.update_queried_pokemon(filtered_pokemon);
      }
    }, 500);
  }

  displayPokemon() {
    // if user has an input value, display pokemon from queried_pokemon array

    // else

    // display pokemon from pokemon to disply array
    const { queried_pokemon, pokemon_to_display } = this.props.pokemon;

    if (queried_pokemon.length > 0) {
      return queried_pokemon.map(function(pokemon) {
        return <PokemonCard pokemon={pokemon} key={pokemon.entry_number} />;
      });
    } else {
      return pokemon_to_display.map(function(pokemon) {
        return <PokemonCard pokemon={pokemon} key={pokemon.entry_number} />;
      });
    }
  }

  render() {
    return (
      <div className="pokedex-container">
        <div className="input-container">
          <form className="nav">
            <h1 className="logo">POKEDÉX</h1>
            <input
              type="text"
              name="Search Pokemon"
              placeholder="Search"
              autoComplete="off"
              className="input"
              onChange={this.handleSearch}
              value={this.state.input}
            />
          </form>
        </div>
        <div className="main-content">
          <div className="pokemon-container">{this.displayPokemon()}</div>
          <div className="load">
            <button className="load-more" onClick={this.props.displayNextBatch}>
              Load More Pokémon
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default PokemonList;
