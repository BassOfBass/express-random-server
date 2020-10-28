/**
 * Converts a given relative href/src to an absolute url.
 * 
 * TODO: make it environemnt agnostic.
 * @param {string} href 
 */
export function returnAbsoluteHREF(href) {
  const URLBase = new URL(`http://${process.env.HOST}:${process.env.PORT}/`);

  return new URL(href, URLBase);
};