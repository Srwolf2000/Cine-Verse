import { useMemo } from "react"
import { useSelector } from "react-redux"

/**
 * 
 *  @param {string[]} keys - Ej: ["popular", "upcoming"]
 */


export function useGetItems(keys = '') {

  const stateMovies = useSelector((state) => state.movies)


  const data = useMemo(() => {
    console.log('soy yo el getItems')
   return keys.map((key) => {
      const word = key.toLowerCase()
      

      if (word === 'popular') {
        return {
          name: word,
          items: stateMovies.popular.items,
          page: stateMovies.popular.page,
          loadingState: stateMovies.status.popular,
          errorState: stateMovies.error.popular,
          
        }
      } else if (word === 'upcoming') {
        return {
          name: word,
          items: stateMovies.upcoming.items,
          page: stateMovies.upcoming.page,
          loadingState: stateMovies.status.upcoming,
          errorState: stateMovies.error.upcoming
        }
      } else if (word === 'toptedmovies') {
        return {
          name: word,
          items: stateMovies.topTedMovies.items,
          page: stateMovies.topTedMovies.page,
          loadingState: stateMovies.status.topTedMovies,
          errorState: stateMovies.error.topTedMovies
        }
      }
      return null
    }).filter(Boolean);
    
  }, [keys.join(','), stateMovies]);

  return data
  
}
