import React, { useRef } from "react";
import { styles } from "../../styles/tailwindGlobals";

const ContactForm = () => {
	const name = useRef(null);
	const email = useRef(null);
	const message = useRef(null);
	const workouts = useRef("off");
	const articles = useRef("off");
	const training = useRef("off");

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const data = {
				name: name.current.value,
				email: email.current.value,
				message: message.current.value,
				workouts: workouts.current.checked,
				articles: articles.current.checked,
				training: training.current.checked,
			};
			fetch("api/contact", {
				method: "post",
				body: JSON.stringify(data),
			});
		} catch (error) {
			console.log("something went astray");
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="flex flex-col space-y-5 bg-letters-light md:p-5 md:bg-white md:rounded-r-lg"
		>
			<label htmlFor="name">
				<input
					id="name"
					type="text"
					placeholder="Name"
					ref={name}
					className={`${styles.contactInput}`}
				/>
			</label>
			<label htmlFor="email">
				<input
					id="email"
					type="text"
					placeholder="Email"
					ref={email}
					className={`${styles.contactInput}`}
				/>
			</label>

			<div className="flex flex-wrap">
				<label
					className={`${styles.checkboxLabel}`}
				>
					<input
						id="workouts"
						type="checkbox"
						ref={workouts}
						className={`${styles.checkbox}`}
					/>
					<span
						className={`${styles.checkboxSpan}`}
					>
						Workouts
					</span>
				</label>
				<label
					className={`${styles.checkboxLabel}`}
				>
					<input
						id="articles"
						type="checkbox"
						ref={articles}
						className={`${styles.checkbox}`}
					/>
					<span
						className={`${styles.checkboxSpan}`}
					>
						Articles
					</span>
				</label>
				<label
					className={`${styles.checkboxLabel}`}
				>
					<input
						id="training"
						type="checkbox"
						ref={training}
						className={`${styles.checkbox}`}
					/>
					<span
						className={`${styles.checkboxSpan}`}
					>
						Training
					</span>
				</label>
			</div>
			<label htmlFor="message">
				<textarea
					id="message"
					type="text"
					rows="6"
					placeholder="Message"
					ref={message}
					className={`${styles.contactInput} resize-y h-24 md:h-48`}
				/>
			</label>
			<button
				type="submit"
				className={`${styles.submit} `}
			>
				Send
			</button>
		</form>
	);
};

export default ContactForm;