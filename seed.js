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

  const PlotVegetables = db.model('vegetable_plot');

  const carrotP = Vegetable.create({
    name: 'carrot',
    color: 'orange',
    plantedOn: new Date(),
  });

  const kaleP = Vegetable.create({
    name: 'kale',
    color: 'dark green',
    plantedOn: new Date(),
  });

  const tomatoP = Vegetable.create({
    name: 'tomato',
    color: 'red',
    plantedOn: new Date(),
  });

  let carrot;
  const gardener1 = carrotP.then(v => {
    carrot = v;
    return Gardener.create({
      name: 'Mina',
      age: '100',
      favoriteVegetableId: v.id
    });
  });

  const plot1 = gardener1.then(g => {
      return Plot.create({
        size: 100,
        gardenerId: g.id
      });
    });

  const carrotToSave = plot1.then(p => {
    return PlotVegetables.create({
      vegetableId: carrot.id,
      plotId: p.id
      });
  });



  /*const kale = Vegetable.create({
    name: 'kale',
    color: 'dark green',
    plantedOn: new Date(),
  }).then((v) => {
    //console.log(v);
  }).catch((err) => {
    console.log(err);
  });

  const tomato = Vegetable.create({
    name: 'tomato',
    color: 'red',
    plantedOn: new Date(),
  }).then((v) => {
    //console.log(v);
  }).catch((err) => {
    console.log(err);
  });*/

  vegetables.push(carrotToSave);//, kale, tomato);

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
