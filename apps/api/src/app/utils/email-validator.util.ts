import { Logger } from '@nestjs/common';
import axios from 'axios'

export function isEmailValid(email: string): boolean{
  let validState = false;
  
  const options = {
    method: 'GET',
    url: 'https://zerobounce1.p.rapidapi.com/v2/validate',
    params: {api_key: '6ed36dda6ced4384ac320ec01f0e2be5', email: email},
    headers: {
      'X-RapidAPI-Key': 'd7440cde14mshbf68558dfad300ap1c828djsnd945e309024d',
      'X-RapidAPI-Host': 'zerobounce1.p.rapidapi.com'
    }
  };

  let result: any;
  console.log('Hello');

  axios.request(options)
  .then(function (response) {
    result = response
    if(response.status === 200){
      validState = true
    }
  }).catch(function (error){
    Logger.log(error)
  })
  console.log('Results: ', result);
  return validState
}
