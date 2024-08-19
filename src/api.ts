import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client/core";
import {apiBase} from "@/settings.ts";

let authToken: string | undefined;

function getUrl(url: string) {
	return new URL(url, apiBase);
}

// HTTP connection to the API
const httpLink = createHttpLink({
	// You should use an absolute URL here
	uri: getUrl("/graphql").toString(),
	async fetch(url, options) {
		if (authToken == undefined) {
			let res = await window.fetch(getUrl("/auth/token"));
			let json = await res.json();

			authToken = json.token;
		}

		let headers = new Headers(options?.headers);

		headers.append("Authorization", `Bearer ${authToken}`);

		options ??= {};

		options.headers = headers;

		return window.fetch(url, options);
	},
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
export const apolloClient = new ApolloClient({
	link: httpLink,
	cache,
});
