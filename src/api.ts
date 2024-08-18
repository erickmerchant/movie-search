import {ApolloClient, createHttpLink, InMemoryCache} from "@apollo/client/core";
import {apiBase} from "@/settings.ts";

let token: string | undefined;

if (token == undefined) {
	let res = await window.fetch(getUrl("/auth/token"));
	let json = await res.json();

	token = json.token;
}

function getUrl(url: string) {
	return new URL(url, apiBase);
}

// HTTP connection to the API
const httpLink = createHttpLink({
	// You should use an absolute URL here
	uri: getUrl("/graphql").toString(),
	headers: {
		Authorization: `Bearer ${token}`,
	},
});

// Cache implementation
const cache = new InMemoryCache();

// Create the apollo client
export const apolloClient = new ApolloClient({
	link: httpLink,
	cache,
});
