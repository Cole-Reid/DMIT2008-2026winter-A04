const BASE_URL = 'https://dummyjson.com/quotes/'

export const getRandomQuote = () => {
  return fetch(`${BASE_URL}/random`)
    .then((response)=> {
      return response.json()
    }).then((data)=> {
      return Promise.resolve(data)
    })    
}
