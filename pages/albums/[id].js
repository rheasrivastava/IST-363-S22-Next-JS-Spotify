import Col from '../../components/Col'
import Container from '../../components/Container'
import Heading from '../../components/Heading'
import Image from 'next/image'
import Layout from '../../components/Layout'
import Link from 'next/link'
import Row from '../../components/Row'
import Section from '../../components/Section'
import Tracks from '../../components/Tracks'

import { getAllAlbumSlugs, getSingleAlbumData } from '../../lib/api'

// WATERFALL
// 1. getStaticPaths
export async function getStaticPaths() {
	const paths = await getAllAlbumSlugs();
	return {
		paths,
		fallback: false
	}
}
// 2. getStaticProps
export async function getStaticProps({ params }) {
	console.log({ params });
	const albumData = await getSingleAlbumData(params.id);
	return {
		props: {
			albumData
		}
	}
}

// 3. Use the data
const SingleAlbumPage = ({ albumData }) => {
	const { title, featuredImage, albumInformation } = albumData;
	const { sourceUrl, altText, mediaDetails } = featuredImage.node;
	const { year, songsToAlbums, artistsToAlbums } = albumInformation;
	return <Layout>
		<Container>
			<Row>
				<Col xs="12" md="3">
					<Image
						src={sourceUrl}
						alt={altText}
						width={mediaDetails.width}
						height={mediaDetails.height}
					/>
				</Col>
				<Col xs="12" md="9" justifyContent='center'>
					<Heading level="1">{title}</Heading>
					{/*<Heading level="2">{year}</Heading>*/}	
					{artistsToAlbums && artistsToAlbums.map((artist, index) => {
						const { title, slug } = artist;
						return <Heading level="2">
							<Link href={`/artists/${slug}`}>
								<a>
									{title}
								</a>
							</Link>
						</Heading>
					})}
				</Col>
			</Row>
		
		
		
		{songsToAlbums && 
			<Section>
				<Heading level="2">Songs</Heading>
				<Tracks items={songsToAlbums} />
			</Section>
		}	
		</Container>
	</Layout>
}
export default SingleAlbumPage;