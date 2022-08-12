<template>
  <h1 v-if="!pokemon">Espere por favor...</h1>
  <div v-else>
    <div class="score-container">
      <strong>Score: {{ score }}</strong>
    </div>

    <h1>Who's that pokémon?</h1>

    <PokemonPicture
      class="fade-in"
      :pokemonId="pokemon.id"
      :showPokemon="showPokemon"
    />
    <PokemonOptions
      class="fade-in"
      :pokemons="pokemonArr"
      @selection="checkAnswer"
    />

    <template v-if="showAnswer">
      <h2 class="fade-in">{{ message }}</h2>
      <button @click="newGame">New Game</button>
    </template>
  </div>
</template>

<script>
import PokemonPicture from "@/components/PokemonPicture";
import PokemonOptions from "@/components/PokemonOptions";
import getPokemonOptions from "@/helpers/getPokemonOptions";
//console.log(getPokemonOptions());
export default {
  components: {
    PokemonPicture,
    PokemonOptions,
  },
  data() {
    return {
      pokemonArr: [],
      pokemon: null,
      showPokemon: false,
      showAnswer: false,
      message: "",
      score: 0,
    };
  },
  methods: {
    async mixPokemonArray() {
      this.pokemonArr = await getPokemonOptions();

      const rndInt = Math.floor(Math.random() * 4);
      this.pokemon = this.pokemonArr[rndInt];
    },
    checkAnswer(pokemonId) {
      this.showPokemon = true;
      this.showAnswer = true;

      if (pokemonId === this.pokemon.id) {
        this.message = `CORRECT! Is ${this.pokemon.name}!`;
        this.score += 1;
      } else {
        this.message = `INCORRECT! Is ${this.pokemon.name}!`;
        this.score = 0;
      }
    },
    newGame() {
      this.pokemonArr = [];
      this.showPokemon = false;
      this.showAnswer = false;
      this.pokemon = null;
      this.mixPokemonArray();
    },
  },
  mounted() {
    this.mixPokemonArray();
  },
};
</script>

<style scoped>
.score-container {
  max-width: 90vm;
  display: flex;
  justify-content: flex-end;
  text-align: right;
  font-size: 40px;
  padding-right: 10%;
  /* //margin-left: -200px; */
}
</style>
