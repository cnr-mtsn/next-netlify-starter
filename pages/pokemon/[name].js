export default function PokemonPage({ pokemon }) {
	return <h1>{pokemon.name}</h1>
}
// add getStaticPaths for first pokemon page only
export async function getStaticPaths() {
	const res = await fetch("https://pokeapi.co/api/v2/pokemon")
	const { results } = await res.json()
	const firstPokemon = results[0]
	// return first path only
	return {
		paths: [{ params: { name: firstPokemon.name } }],
		fallback: false,
	}
}
// use getStaticProps to get pokemon data from the API
export async function getStaticProps({ params }) {
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
	const pokemon = await res.json()
	return {
		props: {
			pokemon,
		},
	}
}
