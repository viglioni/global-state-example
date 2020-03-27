import React from 'react';
import PropTypes from 'prop-types';
import {Button} from 'antd'
import {map} from 'ramda'
import {useRouteAsState} from '../../../helpers/hooks'

const BreedButtons = ({}) => {

    const [dogBreed, setDogBreed] = useRouteAsState("breed","random")
    
    const breeds = ['husky', 'dalmatian', 'mix', 'labrador', 'random']

    const buttons = map(
        breed => (
            <Button
              type={breed === dogBreed ? "primary" : "secondary"}
              onClick={()=> setDogBreed(breed)}
              key={breed}
            >
              {breed}
            </Button>),
        breeds)
    
    return (
        <div className="buttons-container">
          {buttons}
        </div>);
};

BreedButtons.propTypes = {};

export default BreedButtons;

