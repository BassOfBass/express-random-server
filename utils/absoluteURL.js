import { URL } from "url";

/**
 * Converts give href/src to an absolute path
 * @param {string} href 
 */
export function returnAbsoluteHREF(href) {
  return URL(href, process.env.HOST)
};