import React, {useEffect, useCallback, useState} from 'react'
import Head from 'next/head'
import getDog from '../../helpers/api'
import {useRouteAsState} from '../../helpers/hooks'
import Loading from '../../helpers/loading'
import "../styles.scss"
import "antd/dist/antd.css";
import BreedButtons from './components/breed-buttons'
import {Button, Typography} from 'antd'

const {Title} = Typography

const Home = () => {
    const [loading, setLoading] = useState(false)
    const [dog, setDog] = useState([])

    // we sont be usiing setDogBreed here
    // you could just call [dogBreed] = ...
    const [dogBreed, setDogBreed] = useRouteAsState("breed", "random")

    
    
    const getRandomDog = useCallback(async ()=>{
        setLoading(true)
        getDog(dogBreed)
            .then(({data:{message}}) => setDog(message))
            .catch(err => console.log(err))
            .finally(()=>setTimeout(()=>setLoading(false),1000))
    },[dogBreed])
    
    
    useEffect(()=>{ getRandomDog() },[dogBreed])
   


    return (
        <div className="home">
          <div className="title"> <Title>Global States in URL</Title>  </div>
          <BreedButtons/>
        <div className="dog-container" style={{backgroundImage: `url(${dog})`}}>
          <Loading show={loading}/>
        </div>
          
          <Button type="primary" onClick={getRandomDog} className="another-one">
            Another one!
          </Button>

        </div>)
}

export default (Home)
