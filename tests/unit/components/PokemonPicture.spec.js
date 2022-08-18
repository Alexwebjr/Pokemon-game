import { shallowMount } from '@vue/test-utils';
import PokemonPicture from '@/components/PokemonPicture';

describe('PokemonPicture component', () => {
  it('should match snapshot', () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: {
        pokemonId: 1,
        showPokemon: false,
      },
    });

    expect(wrapper.html()).toMatchSnapshot();
  });

  it('should show the hidden image and the pokemon 100', () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: {
        pokemonId: 100,
        showPokemon: false,
      },
    });

    const img1 = wrapper.find('img');

    expect(img1.exists()).toBeTruthy();
    expect(img1.classes('hidden-pokemon')).toBe(true);
    expect(img1.attributes('src')).toBe(
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/100.svg'
    );
  });

  it('should show the pokemon if showPokemon:true', () => {
    const wrapper = shallowMount(PokemonPicture, {
      props: {
        pokemonId: 100,
        showPokemon: true,
      },
    });
    const img1 = wrapper.find('img');

    expect(img1.exists()).toBeTruthy();
    expect(img1.classes('hidden-pokemon')).toBe(false);
    expect(img1.classes('fade-in')).toBe(true);
  });
});
