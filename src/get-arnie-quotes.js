const { httpGet } = require("./mock-http-interface");

/**
 * Fetches quotes from the provided URLs.
 * @param {string[]} urls - Array of URLs to fetch quotes from
 * @returns {Promise<Object[]>} Promise that resolves to an array of quote objects or failure objects
 */
const getArnieQuotes = async (urls) => {
  const quotePromises = urls.map(fetchQuote);
  return await Promise.all(quotePromises);
};

/**
 * Fetches a quote from the given URL.
 * @param {string} url - The URL to fetch the quote from.
 * @returns {Promise<Object>} An object containing either the Arnie quote or a failure message.
 */
async function fetchQuote(url) {
  const response = await httpGet(url);
  const { message } = JSON.parse(response.body);

  return response.status === 200
    ? { "Arnie Quote": message }
    : { FAILURE: message };
}

module.exports = {
  getArnieQuotes,
};
