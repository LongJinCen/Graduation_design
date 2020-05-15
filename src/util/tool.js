/**
 *
 * @param {string} locationSearch location.search
 */
export function getQuery (locationSearch = '') {
  const regexp = /(\w+?=\w+)/g
  const result = {}; // eslint-disable-line
  (locationSearch.match(regexp) || []).forEach(query => { // eslint-disable-line
    const temp = query.split('=')
    result[temp[0]] = temp[1]
  })
  return result
}
