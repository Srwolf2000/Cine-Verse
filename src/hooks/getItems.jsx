import { useMemo } from "react"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"

/**
 * 
 *  @param {string[]} keys - Ej: ["popular", "upcoming"]
 */


export function useGetItems(keys = '') {

  const { t } = useTranslation();

  const stateMovies = useSelector((state) => state.movies)
  const stateSearch = useSelector((state) => state.search)
  const stateShow = useSelector((state) => state.show)
  const stateDetail = useSelector((state) => state.cardDetailModal)
  const stateLanguages = useSelector((state) => state.languages)


  const data = useMemo(() => {

    return keys.map((key) => {



      if (key === 1) {
        return {
          code: key,
          name: t('sections.popular'),
          items: stateMovies.popular.items,
          page: stateMovies.popular.page,
          loadingState: stateMovies.status.popular,
          errorState: stateMovies.error.popular,

        }
      } else if (key === 2) {
        return {
          code: key,
          name: t('sections.upcoming'),
          items: stateMovies.upcoming.items,
          page: stateMovies.upcoming.page,
          loadingState: stateMovies.status.upcoming,
          errorState: stateMovies.error.upcoming
        }
      } else if (key === 3) {
        return {
          code: key,
          name: t('sections.topRatedMovies'),
          items: stateMovies.topRatedMovies.items,
          page: stateMovies.topRatedMovies.page,
          loadingState: stateMovies.status.topRatedMovies,
          errorState: stateMovies.error.topRatedMovies,

        }
      } else if (key === 'Search') {
        return {
          name: key,
          items: stateSearch.items,
          loadingState: stateSearch.status,
          errorState: stateSearch.error,
        }
      } else if (key === 4) {

        return {
          code: key,
          name: t('sections.popularShows'),
          items: stateShow.popularTv.items,
          page: stateShow.popularTv.page,
          loadingState: stateShow.status.popularTv,
          errorState: stateShow.error.popularTv,
        }
      } else if (key === 5) {

        return {
          code: key,
          name: t('sections.onTheAirShows'),
          items: stateShow.onTheAirTv.items,
          page: stateShow.onTheAirTv.page,
          loadingState: stateShow.status.onTheAirTv,
          errorState: stateShow.error.onTheAirTv,
        }
      } else if (key === 6) {

        return {
          code: key,
          name: t('sections.topRatedShows'),
          items: stateShow.topRatedTv.items,
          page: stateShow.topRatedTv.page,
          loadingState: stateShow.status.topRatedTv,
          errorState: stateShow.error.topRatedTv,
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
          errorStateSimilar: stateDetail.errorStateSimilar,
        }
      } else if (key === 'Languages') {
        let languages = ''
        if (stateLanguages.language.en) {
          console.log('en is :', stateLanguages.language.en)
          languages = stateLanguages.key.en
        } else if (stateLanguages.language.es) {
          console.log('es is :', stateLanguages.language.es)
          languages = stateLanguages.key.es
        }


        return languages

      }

      return null
    }).filter(Boolean);

  }, [keys.join(','), stateMovies, stateSearch, stateShow, stateDetail, stateLanguages]);

  return data

}
