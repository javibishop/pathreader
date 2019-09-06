const express = require('express')
const app = express()

 app.use(require('./camino'));
 app.use(require('./recorrido'));
// app.use(require('./login'));
// app.use(require('./pais'));
// app.use(require('./localidad'));
// app.use(require('./provincia'));
// app.use(require('./partido'));
// app.use(require('./especialidad'));
// app.use(require('./consejeria'));
// app.use(require('./antecedente'));
// app.use(require('./entrevistaPostAborto'));
// app.use(require('./estudioComplementario'));
// app.use(require('./gestaActual'));

module.exports = app;