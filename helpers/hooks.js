import { pathOr } from 'ramda'
import { useRouter } from 'next/router'
import React, {useState, useEffect} from 'react'

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
    const getUpdatedState = () => decodeURIComponent(
        pathOr(initialState, ['query', queryName], router))
    
    const [state, setState] = useState( getUpdatedState() )

     useEffect(()=> {
        setState( getUpdatedState() )
     }, [router.query])
    
  const setActiveState = state =>
    router.push({
      pathname: router.pathname,
        query: { ...router.query, [queryName]: encodeURIComponent(state) }
    })
  return [state, setActiveState]
}

export const setSeveralStates = (states, r) => {
  const router = useRouter ? useRouter() : r
  router.push({
    pathname: router.pathname,
    query: {...states }
  })
}
