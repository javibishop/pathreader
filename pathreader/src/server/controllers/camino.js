const express = require('express')
const app = express()
const _ = require('underscore')
const Camino = require('../models/camino')
//const { verificaToken } =  require('../middlewares/authentication');

//cada vez q hago un get, se ejecuta el middleware
app.get('/camino/:id', (req, res)  => {
    Camino.findById(req.params.id)
    .exec((err, camino) => {
        
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json(camino);
            
        }
    });   
})

//cada vez q hago un get, se ejecuta el middleware
app.get('/camino', (req, res)  => {

    //esto es loq ue viene en el payload del token luego del middle verificaToken 
    //return res.json(req.usuarie);

    let desde = Number(req.query.desde || 0);
    let hasta = Number(req.query.hasta || 50);

    Camino.find()
    .skip(desde) /* salta los 5 registros por get */
    .limit(hasta) /* 5 registros por get */
    .exec((err, caminoes) => {
        
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            // camino.count((err, cantidad) =>{
            //     return res.json(camino);
            // })
            return res.json(caminoes);
        }
    });     
})

app.post('/camino',  (req, res) => {
    let body = req.body;
    let camino = new Camino({
        titulo: body.titulo,
        contenido: body.contenido,
        orden: body.orden
    });
    
    camino.save((err, caminoDB) => {
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            return res.json({ok: true, usuarie: caminoDB});
        }
    })
})

app.put('/camino/:id',  (req, res) => {
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
    Camino.findByIdAndUpdate(id, body, optionsMongoose, (err, caminoDB) =>{
        if(err){
            return res.status(400).json({ok: false, err});
        }else{
            //usuarioDB.password = null;
            return res.json({ok: true, usuario: caminoDB});
        }
    })
    
})

module.exports = app;