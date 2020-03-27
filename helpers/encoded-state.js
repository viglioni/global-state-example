import { pathOr , compose, filter, isEmpty, not, and} from 'ramda'
import { useRouter } from 'next/router'
import {Base64} from 'js-base64'
import React, {useEffect, useState} from 'react'

/*
 * FUNCTIONS
 */

/*
 * Helpers / syntatic sugars
 */

// Returns object with only defined values
const filterValidStates = (obj) => filter(val =>and(val != undefined, val != ""), obj)

// checks non emptyness
const nonEmpty = obj =>  compose(not, isEmpty)(obj)

// Encode/Decode strings - default function from lib
const {encode : encode64, decode : decode64} = Base64

// Encode/Decode objects to/from URL
const encodeObj = (obj) => compose(encodeURIComponent, encode64, JSON.stringify)(obj)
const decodeObj = (str) => compose(JSON.parse, decode64, decodeURIComponent)(str)


/*
 * Get and set all states directly from/in URL
 */

const getStates =  (router) => {
    const encoded = pathOr(false, ['query',  encode64('states')], router)
    const nonEncoded = filter(element => element != encoded,
                              pathOr([], ['query'], router ))

    if(encoded) return  {...decodeObj(encoded) , ...nonEncoded}
    else return {...nonEncoded}}


const setStates = (states, router) =>{
    const query = nonEmpty( states )
          ? {[encode64("states")] :  encodeObj(states) }
          : undefined
    
    router.push({
        pathname: router.pathname,
        query})}


/*
 * HOOKS
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
    const getUpdatedState = () => pathOr(initialState, [queryName],  getStates(router))
    
    const [state, setState] = useState( getUpdatedState() )

    useEffect(()=> {
        setState( getUpdatedState() )
    }, [router.query])
   
    const setActiveState =  state =>{
        const actualStates =  getStates(router)
        const newStates = filterValidStates({ ...actualStates, [queryName]: state })
        setStates(newStates,router)}
    
    return [state, setActiveState]}

/*
 * Allows you to change several states in one call.
 * It is recommended over a lot of setActiveState calls in a short period of time.
 * @param (obj) states - states you wanna change e.g. {page: 2, pagination: 3}
 * @param (obj optional) router prop
 */
export const setSeveralStates = (states, r) => {
    const router = useRouter ? useRouter() : r
    const actualStates =  getStates(router)
    const newStates = filterValidStates({ ...actualStates, ...states })
    setStates(newStates,router)}
