import Link from "next/link";
import Head from "next/head";
import { styles } from "../../styles/pages.styles";

//data
import { getAllArticles } from "../../lib/wpGraphQL";

export default function Articles({ allPosts: { edges } }) {
	const formatDate = (date) => {
		const newDate = new Date(date);

		return `${
			newDate.getMonth() + 1
		}/${newDate.getDate()}/${newDate.getFullYear()}`;
	};

	return (
		<div>
			<Head>
				<title>Blog articles page</title>
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className="p-5 space-y-10 md:space-y-16">
				<h1 className={`${styles.h1}`}>
					Latest Articles
				</h1>

				<section className="space-y-4 sm:space-y-8">
					{edges.map(({ node }) => (
						<Link
							href={`/articles/${node.slug}`}
							key={node.id}
						>
							<div className="flex flex-col sm:flex-row-reverse sm:justify-between bg-white h-20 xs:h-28 md:h-40 overflow-hidden shadow-lg hover:shadow-2xl rounded-lg cursor-pointer">
								<div>
									<figure className="hidden sm:block sm:w-48 md:w-80">
										<img
											src={
												node
													.extraPostInfo
													.thumbImage
													.mediaItemUrl
											}
											alt={node.title}
										/>
									</figure>
								</div>
								<div className="overflow-ellipsis px-2 space-y-1">
									<p
										className={`${styles.date}`}
									>
										{formatDate(
											node.date
										)}
									</p>
									<h3
										className={`${styles.h3}`}
									>
										{node.title}
									</h3>

									<p className="hidden xs:block text-letters-grey text-sm md:text-xl">
										{
											node
												.extraPostInfo
												.authorExcerpt
										}
									</p>

									<a className="hidden"></a>
								</div>
							</div>
						</Link>
					))}
				</section>
			</main>
		</div>
	);
}

export async function getStaticProps() {
	const allPosts = await getAllArticles();
	return {
		props: {
			allPosts,
		},
		revalidate: 60,
	};
}
