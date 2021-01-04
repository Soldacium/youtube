const express = require('express');
const keys = require('../keys')

const router = express.Router()

let Vimeo = require('vimeo').Vimeo;
let client = new Vimeo(
    keys.vimeoKeys.clientID,
    keys.vimeoKeys.clientSecret,
    keys.vimeoKeys.accessToken);


router.get('/:id',(req,res,next) => {  
    client.request({
        method: 'GET',
        path: '/videos/' + req.params.id
    }, function (error, body, status_code, headers) {
        if (error) {
          console.log(error);
        }
        
        res.status(200).json(body);
    })
    


});




module.exports = router;