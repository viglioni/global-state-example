import { pathOr } from 'ramda'
import { useRouter } from 'next/router'

/*
 * FUNCTIONS
 */

/*
 * Use url query as component state
 * it is necessary to use withRouter on the component
 * and get the 'router' prop
 * obs.: if you are using next 9^+, the router prop is unneeded
 * @param (str) queryName - the query to check/add/modify in url
 * @param (str) initialState - the initial state wanted
 * @param (obj optional) - router prop
 */
export const useRouteAsState =  (queryName, initialState, r) => {
  const router = useRouter ? useRouter() : r
    const activeState = pathOr(initialState, ['query', queryName], router)
  const setActiveState = state =>
    router.push({
      pathname: router.pathname,
      query: { ...router.query, [queryName]: state }
    })
  return [activeState, setActiveState]
}
