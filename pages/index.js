import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.parent}>
      <Head>
        <title>Ram&apos;s neck of the woods</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link
          href="/fonts/GTWalsheim/GTWalsheimPro-Medium.woff2"
          rel="preload"
          as="font"
        />
      </Head>
      <div className={styles.container}>
        <header className={styles.header}>
          <nav>
            <ul>
              <li className={styles.notesLink}>
                <Link href="/notes">Musings → </Link>
              </li>
            </ul>
          </nav>
        </header>

        <main className={styles.main}>
          <h1 className={styles.title}>Ramanujan.</h1>

          <p className={styles.description}>
            Software Engineer{" "}
            <a target="_blank" href="https://www.paypal.com" rel="noreferrer">
              @ PayPal
            </a>
          </p>

          <div className={styles.grid}></div>
        </main>
      </div>
    </div>
  );
}
