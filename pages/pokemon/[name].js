import Image from "next/image"
import Link from "next/link"

export default function PokemonPage({ pokemon }) {
	const pText =
		pokemon.name === "bulbasaur"
			? "This page was generated at build time"
			: "This page was statically generated at request time for your region"
	return (
		<div className="pokemon-page">
			<div className="pokemon-card">
				<Image
					src={pokemon.sprites.front_default}
					height={200}
					width={200}
					alt={pokemon.name}
					placeholder="blur"
					blurDataURL={pokemon.sprites.front_default}
				/>
				<h1 style={{ textTransform: "capitalize" }}>
					{pokemon.name}
					{pokemon.name === "venusaur" && " 🌱"}
					{pokemon.name === "squirtle" && " 💦"}
					{/* {pokemon.name.includes("charm") && " 🔥"} */}
				</h1>
			</div>
			<a className="pokemon-page-link" href="/">
				&lt; Select Page
			</a>
			<p>{pText}</p>
		</div>
	)
}
// add getStaticPaths for first pokemon page only
export async function getStaticPaths() {
	const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=500")
	const { results } = await res.json()
	const firstPokemon = results[0]
	// return first path only
	return {
		paths: [{ params: { name: firstPokemon.name } }],
		fallback: "blocking",
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
