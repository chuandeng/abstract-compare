export function getUrl (page) {
  const winURL = process.env.NODE_ENV === 'development'
    ? `http://localhost:9080/#/${page}`
    : `file://${__dirname}/index.html#/${page}`
  console.log(winURL)
  return winURL
}
