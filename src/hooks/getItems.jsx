import { useSelector } from "react-redux"

/**
 * 
 * @param {string} keys - Ej: "popular", "upcoming"
 */


export function useGetItems (Category){
const text = Category.toLowerCase()
console.log(text)

  const moviesPopular = useSelector(state => state.movies.popular)
  const moviesUpcoming = useSelector(state => state.movies.upcoming)
  const moviesTopTedMovies = useSelector(state => state.movies.topTedMovies)


if (text === 'popular'){
return moviesPopular
}else if(text==='upcoming'){
    return moviesUpcoming
}else if (text === 'top ted movies'){
    return moviesTopTedMovies
}
}