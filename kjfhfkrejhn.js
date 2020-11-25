// app post = when you send from an input on the what?
app.post('/', (req, res) => {
  const name = {
    password: req.body.name
  }
})
//   think about newdate

// distractions double-->from the fern-->check CRUD
// the opposite of get, 
// post is for sending from front end to back end
app.post('/', (req, res) => {
  console.log(req.body)
  // const { name, email, favoriteColor, homeTown } = req.body
//   req.body.name --etc request / response
  // var data = {
  //   name: name,
  //   email: email,
  //   favoriteColor: favoriteColor,
  //   homeTown: homeTown,
  // }
//   sends to sex page
  res.redirect('/success')
})