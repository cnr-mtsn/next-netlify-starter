import Head from "next/head"
import { useRouter } from "next/router"

export default function Home({ pokemon }) {
	const router = useRouter()
	return (
		<div className="container">
			<Head>
				<title>Next.js Starter!</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main>
				<div className="container">
					<h1>Select a Pokemon</h1>
					<span>
						Bulbasaur is generated at build time - all others are
						generated at request time
					</span>
					{/* choose a single pokemon from the list and navigate to its page */}
					{/* create a select component with each pokemon as an option */}
					<select
						name="pokemon"
						style={{ textTransform: "capitalize" }}>
						{pokemon.map(p => (
							<option
								style={{ textTransform: "capitalize" }}
								value={p.name}
								onClick={() =>
									router.push(`/pokemon/${p.name}`)
								}>
								{p.name}
							</option>
						))}
					</select>
				</div>
			</main>
		</div>
	)
}

// use getStaticProps to fetch all pokemon from the API
export async function getStaticProps() {
	const res = await fetch("https://pokeapi.co/api/v2/pokemon")
	const data = await res.json()
	return {
		props: {
			pokemon: data.results,
		},
	}
}
