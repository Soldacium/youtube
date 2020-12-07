const express = require('express');

const router = express.Router()

let Vimeo = require('vimeo').Vimeo;
let client = new Vimeo(
    "0064218eb7b769c55fb6baaeac1fc366922cce50", 
    "rVGPDVvvfnAqYM/amfOAX1iy7QVgY4/Y3XTcmozy9uRrpvP9snogwcn1001D8HR+4CU/yjuB3/j+jyt1Ctu/NghJfeBJaorMfHKHIFlTCLgeMtB50u/GUkDUH+tbKibH", 
    "0633f0a4251549314765c9a05bc4e4fd");



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