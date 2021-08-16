import axios from "axios";

function getRequestParams(email) {
	const API_KEY = process.env.MAILCHIMP_API_KEY;
	const AUDIENCE_ID = process.env.MAILCHIMP_AUDIENCE_ID;
	const DATACENTER =
		process.env.MAILCHIMP_API_KEY.split("-")[1];
	const url = `https://${DATACENTER}.api.mailchimp.com/3.0/lists/${AUDIENCE_ID}/members`;

	// you can add aditional paramaters here. See full list of available paramaters at:
	// https://mailchimp.com/developer/reference/lists/list-members/
	const data = {
		email_address: email,
		status: "subscribed",
	};

	const base64ApiKey = Buffer.from(
		`anystring:${API_KEY}`
	).toString("base64");
	const headers = {
		"Content-Type": "application/json",
		Authorization: `Basic ${base64ApiKey}`,
	};

	return {
		url,
		data,
		headers,
	};
}

export default async (req, res) => {
	const { email } = req.body;

	if (!email || !email.length) {
		return res.status(400).json({
			error: "Forgot to add your email?",
		});
	}

	try {
		const { url, data, headers } =
			getRequestParams(email);

		const response = await axios.post(url, data, {
			headers,
		});

		return res.status(201).json({ error: null });
	} catch (error) {
		return res.status(400).json({
			error: `Looks like something went wrong, if you send me your info to huntercampbellfitness@gmail.com I'll get you signed up!`,
		});
	}
};
