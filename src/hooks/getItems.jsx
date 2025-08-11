import { useMemo } from "react"
import { useSelector } from "react-redux"

/**
 * 
 *  @param {string[]} keys - Ej: ["popular", "upcoming"]
 */


export function useGetItems(keys = '') {

  const stateMovies = useSelector((state) => state.movies)
  const stateSearch = useSelector((state) => state.search)
  const stateShow = useSelector((state) => state.show)
  const stateDetail = useSelector((state) => state.cardDetailModal)


  const data = useMemo(() => {

    return keys.map((key) => {



      if (key === 'Popular') {
        return {
          name: key,
          items: stateMovies.popular.items,
          page: stateMovies.popular.page,
          loadingState: stateMovies.status.popular,
          errorState: stateMovies.error.popular,

        }
      } else if (key === 'Upcoming') {
        return {
          name: key,
          items: stateMovies.upcoming.items,
          page: stateMovies.upcoming.page,
          loadingState: stateMovies.status.upcoming,
          errorState: stateMovies.error.upcoming
        }
      } else if (key === 'Top Ted Movies') {
        return {
          name: key,
          items: stateMovies.topTedMovies.items,
          page: stateMovies.topTedMovies.page,
          loadingState: stateMovies.status.topTedMovies,
          errorState: stateMovies.error.topTedMovies,

        }
      } else if (key === 'Search') {
        return {
          name: key,
          items: stateSearch.items,
          loadingState: stateSearch.status,
          errorState: stateSearch.error,
        }
      } else if (key === 'PopularTv') {

        return {
          name: key,
          items: stateShow.popularTv.items,
          page: stateShow.popularTv.page,
          loadingState: stateShow.status.popularTv,
          errorState: stateShow.error.popularTv,
        }
      } else if (key === 'On The Air Tv') {

        return {
          name: key,
          items: stateShow.onTheAirTv.items,
          page: stateShow.onTheAirTv.page,
          loadingState: stateShow.status.onTheAirTv,
          errorState: stateShow.error.onTheAirTv,
        }
      } else if (key === 'Top Ted Tv') {

        return {
          name: key,
          items: stateShow.topTedTv.items,
          page: stateShow.topTedTv.page,
          loadingState: stateShow.status.topTedTv,
          errorState: stateShow.error.topTedTv,
        }
      } else if (key === 'Detail') {
        return {
          movie: stateDetail.items.item,
          images: stateDetail.images.image,
          cast: stateDetail.cast.people,
          similar: stateDetail.similar.items,
          loadingStateItem: stateDetail.items.status,
          loadingStateImage: stateDetail.images.status,
          loadingStateCast: stateDetail.cast.status,
          loadingStateSimilar: stateDetail.similar.status,
          errorStateItem: stateDetail.errorItems,
          errorStateImages: stateDetail.errorImages,
          errorStateCast: stateDetail.errorCast,
          errorStateSimilar:stateDetail.errorStateSimilar,
        }
      }

      return null
    }).filter(Boolean);

  }, [keys.join(','), stateMovies, stateSearch, stateShow, stateDetail]);

  return data

}
