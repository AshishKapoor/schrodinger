import Head from "next/head";
import { GridComponent } from "../components/Grid";

export default function App() {
  return (
    <div>
      <Head>
        <title>Cats gallery</title>
        <meta name="description" content="cats gallery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <GridComponent />
    </div>
  );
}
