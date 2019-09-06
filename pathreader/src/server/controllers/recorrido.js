const express = require('express')
const app = express()
const _ = require('underscore')
const Recorrido = require('../models/recorrido')
//const { verificaToken } =  require('../middlewares/authentication');

//cada vez q hago un get, se ejecuta el middleware
app.get('/recorrido/:id', (req, res)  => {
    Recorrido.findById(req.params.id)
    .exec((err, recorrido) => {
        
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(recorrido);
            
        }
    });   
})

app.get('/recorrido/porcamino/:caminoId', (req, res)  => {

    //esto es loq ue viene en el payload del token luego del middle verificaToken 
    //return res.json(req.usuarie);

    let desde = Number(req.query.desde || 0);
    let hasta = Number(req.query.hasta || 50);

    Recorrido.find({caminoId: req.params.caminoId})
    .skip(desde) /* salta los 5 registros por get */
    .limit(hasta) /* 5 registros por get */
    .exec((err, recorridoes) => {
        
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            // recorrido.count((err, cantidad) =>{
            //     return res.json(recorrido);
            // })
            return res.json(recorridoes);
        }
    });     
})
//cada vez q hago un get, se ejecuta el middleware
app.get('/recorrido', (req, res)  => {

    //esto es loq ue viene en el payload del token luego del middle verificaToken 
    //return res.json(req.usuarie);

    let desde = Number(req.query.desde || 0);
    let hasta = Number(req.query.hasta || 50);

    Recorrido.find()
    .skip(desde) /* salta los 5 registros por get */
    .limit(hasta) /* 5 registros por get */
    .exec((err, recorridoes) => {
        
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            // recorrido.count((err, cantidad) =>{
            //     return res.json(recorrido);
            // })
            return res.json(recorridoes);
        }
    });     
})

app.post('/recorrido',  (req, res) => {
    let body = req.body;
    let recorrido = new Recorrido({
        titulo: body.titulo,
        contenido: body.contenido,
        orden: body.orden,
        caminoId: body.caminoId
    });
    
    recorrido.save((err, recorridoDB) => {
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json({ok: true, usuarie: recorridoDB});
        }
    })
})

app.put('/recorrido/:id',  (req, res) => {
    //el :id aparece en params, si es otro nombre, aparece otro nombre.
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre']);
    //new, es para que retorne el usuario actualizado. runV es para que corra las validaciones definidas antes de grabar. Sino no las corre
    let optionsMongoose = {
        new: true, 
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
        context: 'query'
    }
    Recorrido.findByIdAndUpdate(id, body, optionsMongoose, (err, recorridoDB) =>{
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            //usuarioDB.password = null;
            return res.json({ok: true, usuario: recorridoDB});
        }
    })
    
})

module.exports = app;