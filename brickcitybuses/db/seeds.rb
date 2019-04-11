# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create([
  {name: "John Doe", email: "johndoe@mailinator.com", password: "johnny"},
  {name: "Hank Hill", email: "hankhill@mailinator.com", password: "propane"}
  ])
Bus.create([
  {origin: "Broad St", destination: "Penn Station", user_id: 1},
  {origin: "Washington Park", destination: "NJ Pac", user_id: 1},
  {origin: "Military Park", destination: "Grove Street", user_id: 2},
  {origin: "Washington St", destination: "Norfolk St", user_id: 2},
  ])
