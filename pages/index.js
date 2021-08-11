import Link from "next/link";
import Head from "next/head";

export default function Home() {
	return (
		<>
			<Head>
				<title>Create Next App</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="p-5">
				<h1>Welcome to our demo blog!</h1>
				<p>
					You can find more articles on the{" "}
					<Link href="/blog">
						<a>blog articles page</a>
					</Link>
				</p>
			</main>
		</>
	);
}
