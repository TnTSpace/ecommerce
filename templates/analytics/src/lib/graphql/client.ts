// src/lib/graphql/client.ts
const GRAPHQL_ENDPOINT = 'https://api.konga.com/v1/graphql';

export async function graphqlRequest<T>(
	query: string,
	variables: Record<string, any> = {},
	options: RequestInit = {}
): Promise<T> {
	const res = await fetch(GRAPHQL_ENDPOINT, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			...options.headers
		},
		body: JSON.stringify({
			query,
			variables
		}),
		...options
	});

	if (!res.ok) {
		const errorText = await res.text();
		throw new Error(`GraphQL error: ${res.status} ${res.statusText} - ${errorText}`);
	}

	const json = await res.json();
	if (json.errors) {
		throw new Error(`GraphQL response errors: ${JSON.stringify(json.errors)}`);
	}
	return json.data;
}
