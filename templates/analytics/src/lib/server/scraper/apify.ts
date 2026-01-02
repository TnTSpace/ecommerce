// import { ApifyClient } from 'apify-client';
// import { APIFY_ACTOR_ID, APIFY_API_TOKEN } from '$env/static/private';

// // Initialize the ApifyClient with API token
// const client = new ApifyClient({
//   token: APIFY_API_TOKEN,
// });

// // Prepare Actor input
// const input = {
//   "searchUrls": [
//     "https://www.temu.com/search_result.html?search_key=men%20suits&search_method=user"
//   ]
// };

// (async () => {
//   // Run the Actor and wait for it to finish
//   const run = await client.actor(APIFY_ACTOR_ID).call(input);

//   // Fetch and print Actor results from the run's dataset (if any)
//   console.log('Results from dataset');
//   const { items } = await client.dataset(run.defaultDatasetId).listItems();
//   items.forEach((item) => {
//     console.dir(item);
//   });
// })();

// export const apifyFetch = async (input: { searchUrls: string[] }) => {
//   const run = await client.actor(APIFY_ACTOR_ID).call(input);

//   // Fetch and print Actor results from the run's dataset (if any)
//   console.log('Results from dataset');
//   const { items } = await client.dataset(run.defaultDatasetId).listItems();
//   console.log({ items })
//   return items
// }