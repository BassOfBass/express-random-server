import express from "express"; // only for JSDoc types

/**
 * Converts a given relative href/src to an absolute url.
 * 
 * TODO: rewrite for client-side.
 * @param {string} href 
 */
export function returnAbsoluteHREFClient(href) {
};

/**
 * Constructs the base URL out of `request` properties.
 * @param {express.Request} request
 * @returns the function which accepts relative URL and returns absolute version of it
 */
export function returnAbsoluteHREFServer(request) {
  const protocol = request.protocol;
  const fullHostname = request.headers.host;

  return absoluteURL;

  /**
   * Returns absolute URL version out of provided relative one.
   * @param {string} href 
   */
  function absoluteURL(href) {
    const URLBase = new URL(`${protocol}://${fullHostname}`);
    const newURL = new URL(href, URLBase);

    return newURL;
    
  }
}