import Head from 'next/head';
import FlipCardContainer from './components/FlipCardContainer';

export default function Home() {
  return <>
    <Head>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <FlipCardContainer />
  </>
}