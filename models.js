const Sequelize = require('sequelize');

const db = new Sequelize('postgres://localhost:5432/plantr');

// gardener
const Gardener = db.define('gardener', {
  name: {
    type: Sequelize.STRING
  },
  age: {
    type: Sequelize.INTEGER
  }
});

// plot
const Plot = db.define('plot', {
  size: {
    type: Sequelize.INTEGER
  },
  shaded: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

// vegetable
const Vegetable = db.define('vegetable', {
  name: {
    type: Sequelize.STRING
  },
  color: {
    type: Sequelize.STRING
  },
  plantedOn:{
    type: Sequelize.DATE
  }
});

// associations
Plot.belongsTo(Gardener); // Plot table contains a foreign key (gardenerId);
Gardener.hasOne(Plot);

Vegetable.belongsToMany(Plot, {through: 'vegetable_plot'});
Plot.belongsToMany(Vegetable, {through: 'vegetable_plot'});

Gardener.belongsTo(Vegetable, {as: 'favorite_vegetable'});


module.exports = {db, Gardener, Plot, Vegetable};
