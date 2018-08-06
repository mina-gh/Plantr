const {db, Gardener, Plot, Vegetable} = require('./models');

const forcedDB = db.sync({force: true});

 // create vegetables first


forcedDB
.then(() => {
  console.log('db is connected');
})
.then(() => {
  // seeding vegetables
  let vegetables = [];

  const carrot = Vegetable.create({
    name: 'carrot',
    color: 'orange',
    planted_on: new Date(),
  }).then((v) => {
    console.log("carrot is added, now tring to add a gardener")

    return Gardener.create({
      name: 'Mina',
      age: '100',
      favoriteVegetableId: v.id
    });
  }).catch((err) => {
    console.log(err);
  });

  const kale = Vegetable.create({
    name: 'kale',
    color: 'dark green',
    planted_on: new Date(),
  }).then((v) => {
    //console.log(v);
  }).catch((err) => {
    console.log(err);
  });

  const tomato = Vegetable.create({
    name: 'tomato',
    color: 'red',
    planted_on: new Date(),
  }).then((v) => {
    //console.log(v);
  }).catch((err) => {
    console.log(err);
  });

  vegetables.push(carrot, kale, tomato);

  return Promise.all(vegetables);

  /*return Vegetable.create({
    name: 'carrot',
    color: 'orange',
    planted_on: new Date(),
  }).then((v) => {
    console.log("carrot was added");
    console.log(v);
  }).catch((err) => {
    console.log(err);
  });*/
})
.catch(() => {
  console.error('an error occurred')
})
.finally(() => {
  console.log('closing the db');
  db.close();
});
