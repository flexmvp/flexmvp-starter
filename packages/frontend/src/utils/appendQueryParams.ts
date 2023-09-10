export function appendQueryParams(
  url: string,
  paramsObj?: { [key: string]: string }
): string {
  // console.log("appendQueryParams", { url, paramsObj });
  if (!paramsObj) return url;

  // Determine whether the URL is absolute
  const isAbsoluteURL = /^https?:\/\//.test(url);

  // Create a URL object. If the URL is relative, use the current page's location as the base
  let urlObj = isAbsoluteURL
    ? new URL(url)
    : new URL(url, window.location.href);

  // Retrieve the existing search parameters from the URL
  let searchParams = new URLSearchParams(urlObj.search);

  // Iterate over the paramsObj to append each key-value pair to the search parameters
  for (let key in paramsObj) {
    searchParams.append(key, paramsObj[key]);
  }

  // Update the URL object's search parameters
  urlObj.search = searchParams.toString();
  // console.log("appendQueryParams", { urlObj, toString: urlObj.toString() });

  // Return the updated URL as a string
  return urlObj.toString();
}
