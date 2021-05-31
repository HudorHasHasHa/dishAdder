import axios from 'axios';

export const addDish = userObj => {
  return (dispatch) => {
    axios.post('https://frosty-wood-6558.getsandbox.com/dishes', { userObj })
    .then(response => {
      console.log(response)
      dispatch({
        type: 'ADD_USER',
        payload: response.data,
      })
      .catch(error => {
        console.log(error);
      })
    })
  }
}