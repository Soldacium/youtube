const express = require('express');

const router = express.Router()

let Vimeo = require('vimeo').Vimeo;
let client = new Vimeo(
    'clientID',
    'client_secret',
    'access_token');



router.get('/:id',(req,res,next) => {  
    client.request({
        method: 'GET',
        path: '/videos/' + req.params.id
    }, function (error, body, status_code, headers) {
        if (error) {
          console.log(error);
        }
        
        res.status(200).json({
            data: body
        });
    })
    


});




module.exports = router;