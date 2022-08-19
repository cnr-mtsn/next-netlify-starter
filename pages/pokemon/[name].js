import Image from "next/image"

export default function PokemonPage({ pokemon }) {
	return (
		<div
			style={{
				display: "flex",
				alignItems: "center",
				margin: "1rem auto",
				width: "max-content",
				border: "1px solid #ccc",
				borderRadius: ".5rem",
				paddingRight: "2rem",
			}}>
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
				{/* {pokemon.name === "bulbasaur" && " 🌱"} */}
			</h1>
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
		fallback: process.env.NODE_ENV === "production" ? false : "blocking",
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
