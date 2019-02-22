export const emailRegex = RegExp(
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
)

export const formValid = ({ formErrors, ...rest }) => {
  let valid = true
  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === '' && (valid = false)
  })

  //Validate if the form errors are empty
  Object.values(formErrors).forEach(val => {
    val.lengh > 0 && (valid = true)
  })
  return valid
}
