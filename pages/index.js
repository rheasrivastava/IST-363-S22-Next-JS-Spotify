import Head from 'next/head'

// custom components
import Layout from '../components/Layout'
import NewReleases from '../components/NewReleases'
import Showcase from '../components/Showcase'

import { getAlbums } from '../lib/api'

export async function getStaticProps() {
	const albums = await getAlbums()
	return {
		props: {
			albums
		}
	}
}

export default function Home({ albums }) {
  return (
    <Layout>
		<Head>
			<title>Spotify IST 363</title>
			<link rel="icon" href="/favicon.ico" />
			<meta name="description" content="This is my Spotify website for IST 363 Spring 2022"/>
		</Head>
		<Showcase />
		<NewReleases items={albums} />
		{/*<TracksByGenre items={tracks} />*/}
    </Layout>
  )
}