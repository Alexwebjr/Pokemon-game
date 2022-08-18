import { shallowMount, mount } from '@vue/test-utils';
import PokemonPage from '@/pages/PokemonPage';
import { pokemons } from '../mocks/pokemons.mock';
import PokemonOptions from '@/components/PokemonOptions';
import PokemonPicture from '@/components/PokemonPicture';

describe('PokemonPage component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallowMount(PokemonPage);
  });

  it('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should call mixPokemonArray when mount', () => {
    const mixPokemonArraySpy = jest.spyOn(
      PokemonPage.methods,
      'mixPokemonArray'
    );
    const wrapper = shallowMount(PokemonPage);

    expect(mixPokemonArraySpy).toHaveBeenCalled();
  });

  it('should match snapshop after pokemon load', () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArr: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: '',
          score: 0,
        };
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should show components: PokemonPicture, PokemonOptions', () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArr: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: '',
          score: 0,
        };
      },
    });
    const tagOpt = wrapper.find('pokemon-picture-stub');
    const tagPic = wrapper.find('pokemon-options-stub');

    // PokemonOptions, PokemonPicture should Exist
    expect(tagPic.exists()).toBeTruthy();
    expect(tagOpt.exists()).toBeTruthy();

    // PokemonPicture should have attribute pokemonId === 1
    expect(tagOpt.attributes('pokemonid')).toBe('1');

    // PokemonOptions should have attibute pokemon tobe True
    expect(tagPic.attributes('pokemons')).toBeTruthy();
  });

  it('should show message', async () => {
    const wrapper = shallowMount(PokemonPage, {
      data() {
        return {
          pokemonArr: pokemons,
          pokemon: pokemons[0],
          showPokemon: false,
          showAnswer: false,
          message: '',
          score: 0,
        };
      },
    });

    await wrapper.vm.checkAnswer(1);

    expect(wrapper.find('h2').exists()).toBeTruthy();
    expect(wrapper.vm.showPokemon).toBe(true);
    expect(wrapper.find('h2').text()).toBe(`CORRECT! Is ${pokemons[0].name}!`);

    await wrapper.vm.checkAnswer(10);
    expect(wrapper.vm.message).toBe(`INCORRECT! Is ${pokemons[0].name}!`);
  });
});
