import Head from "next/head";
import styles from "../styles/Home.module.css";
import useSwr from "swr";

export default function Home() {
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error } = useSwr('api/cats', fetcher)

  if (error) return <div>Failed to load users</div>
  if (!data) return <div>Loading...</div>

  return (
    <div className={styles.container}>
      <Head>
        <title>Cats gallery</title>
        <meta name="description" content="cats gallery" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Cats gallery</h1>

        <div className={styles.grid}>
          {data.map((cat) => (
            <div key={cat.type} onClick={() => console.log(cat.title)}>
              <p className={styles.card}>{cat.title}</p>
              <img
                className={styles.card}
                src={`/cats/${cat.type}.png`}
                alt={cat.title}
              />
            </div>
          ))}
        </div>
        <pre>
          Note: Feel free to drag and drop the cards, you may as well click on
          any one of them.
        </pre>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://github.com/ashishkapoor/schrodinger"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </footer>
    </div>
  );
}
