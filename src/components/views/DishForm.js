import React from 'react'
import { connect } from 'react-redux'
import { Field, reduxForm, formValueSelector } from 'redux-form'

async function submitToServer(data) {

  try {
    let response = await fetch('https://frosty-wood-6558.getsandbox.com/dishes', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(error);
  }
}


const submit = ({ name, preparation_time, type, no_of_slices, diameter, spiciness_scale, slices_of_bread }) => {

  if (type === "pizza") {
    submitToServer({ name, preparation_time, type, no_of_slices, diameter })
      .then(data => console.log(data));
  } else if (type === "sandwich") {
    submitToServer({ name, preparation_time, type, slices_of_bread })
      .then(data => console.log(data));
  } else if (type === "soup") {
    submitToServer({ name, preparation_time, type, spiciness_scale })
      .then(data => console.log(data));
  } else {
    console.log("invalid food type");
  }
}

class DishForm extends React.Component {



  render() {
    const { type, handleChange, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <Field required placeholder="dish name" name="name" component="input" type="text" onChange={() => handleChange} />
        </div>
        <div>
          <Field required placeholder="preparation time" name="preparation_time" component="input" type="time" step="1" onChange={() => handleChange} />
        </div>
        <div>
          <Field required placeholder="dish type" name="type" component="select" defaultValue="pizza" onChange={() => handleChange}>
            <option>select dish type</option>
            <option value="pizza">pizza</option>
            <option value="soup">soup</option>
            <option value="sandwich">sandwich</option>
          </Field>
        </div>
        {type === "sandwich" ?
          /*for sandwich:
          slices_of_bread - number of slices of bread required (number field)*/
          <div>
            <Field required placeholder="slices of bread" name="slices_of_bread" min="0" component="input" type="number" onChange={() => handleChange} normalize={value => parseInt(value)} />
          </div>

          :
          type === "soup" ?
            /*for soup:
            spiciness_scale - spiciness scale (1-10)*/
            <div class="spiceness">
              <label>spiciness scale </label>
              <Field required placeholder="spiciness scale" name="spiciness_scale" component="select" type="number" onChange={() => handleChange}
                normalize={value => parseInt(value)}>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
              </Field>
            </div>

            :
            /*for pizza:
            no_of_slices - # of slices (number field)
            diameter - diameter (float field)
            */
            <div>
              <Field required placeholder="number of slices" type="number" min="2" max="12" step="2"
                name="no_of_slices" component="input" onChange={handleChange}
                normalize={value => parseFloat(value)} />
              <Field required placeholder="diameter" type="number" name="diameter" component="input" step="0.1" onChange={handleChange}
                normalize={value => parseFloat(value)} />
            </div>
        }
        <button type="submit">Submit</button>
      </form>
    )
  };

}

DishForm = reduxForm({
  // a unique name for the form
  form: 'dish',
  initialValues: {
    preparation_time: "00:00:00",
    no_of_slices: 2,
    diameter: 15,
    spiciness_scale: 1,
  }
})(DishForm)

const selector = formValueSelector('dish')
DishForm = connect(state => {
  // const name = selector(state, 'name')
  // const preparation_time = selector(state, 'preparation_time')nod
  const type = selector(state, 'type')

  //pizza props
  // const no_of_slices = selector(state, 'no_of_slices')
  // const diameter = selector(state, 'diameter')

  //soup props
  // const spiciness_scale = selector(state, 'spiciness_scale')

  //sandwich props
  // const slices_of_bread = selector(state, 'slices_of_bread')

  return {
    type
  }
})(DishForm)

export default (DishForm);


