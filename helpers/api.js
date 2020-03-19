import axios from 'axios'



const getDog = type => {
    const url = type =>
          "https://dog.ceo/api/" +
          (type === "random"
           ? "breeds/image/random"
           : "breed/" + type + "/images/random")
    return axios.get(url(type))
}


export default getDog
