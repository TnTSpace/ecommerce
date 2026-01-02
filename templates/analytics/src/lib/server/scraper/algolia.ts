// algoliaConfig.ts (or directly in your component/service file)
export interface AlgoliaConfig {
  applicationId: string;
  apiKey: string;
  indexName: string;
  searchQuery: string;
  // Add other relevant parameters from your original config if needed for more complex queries
}

const algoliaConfig: AlgoliaConfig = {
  applicationId: "31POOC8CIQ",
  apiKey: "N2RmM2M0Y2UxZTEyZTRlYWRiNjJmYTU5MWY0MWVhMGU0ZjZjMjk3OTNmYTM2YzdlZjg1ZDNlODAyNWNiOTE3MHRhZ0ZpbHRlcnM9JnZhbGlkVW50aWw9MTc1MzE4Mjg3MQ==",
  indexName: "magento2_prod_fr",
  searchQuery: "Sharp Micro-Ondes 20L 800W",
};

export async function searchAlgolia(config: AlgoliaConfig): Promise<any> {
  const url = `https://${config.applicationId}-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.24.0)%3B%20Browser%3B%20instantsearch.js%20(4.77.0)%3B%20Magento2%20integration%20(3.15.0)%3B%20JS%20Helper%20(3.23.0)`;

  // URL-encode the search query
  const encodedSearchQuery = encodeURIComponent(config.searchQuery);

  const requestBody = {
    requests: [
      {
        indexName: config.indexName,
        // This 'params' string is crucial and should accurately reflect what the original site sends.
        // It's a URL-encoded string of key-value pairs.
        params: `analyticsTags=%5B%22WEB%22%2C%22Web%20Search%22%5D&clickAnalytics=true&facets=%5B%22*%22%5D&highlightPostTag=__%2Fais-highlight__&highlightPreTag=__ais-highlight__&hitsPerPage=40&maxValuesPerFacet=1000&numericFilters=%5B%22visibility_search%3D1%22%5D&page=0&query=${encodedSearchQuery}&ruleContexts=%5B%22magento_filters%22%5D&userToken=anonymous-b54fcadc-83dd-4185-9a67-59d35b60ad34&tagFilters=&optionalFilters=m_shipping_location%3AMaroc&optionalFilters=products_labels%3Aoffres+ramadan`
      }
    ]
  };

  const headers = {
    'Content-Type': 'application/json',
    'X-Algolia-Application-Id': config.applicationId,
    'X-Algolia-API-Key': config.apiKey,
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      // Check if the response is not OK (e.g., 403, 500 status codes)
      const errorText = await response.text();
      throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data from Algolia:', error);
    throw error; // Re-throw the error for the caller to handle
  }
}
