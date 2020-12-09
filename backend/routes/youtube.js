const express = require('express');

const router = express.Router()

const {google} = require('googleapis');



router.get('/:id',(req,res,next) => {
    google.youtube('v3').videos.list({
        id: req.params.id,
        part: 'snippet,contentDetails,statistics',
        key: 'apiKey'
    }).then(video => {
        
        res.status(200).json({
            video: video
        })
    }).catch(err => {
        res.status(124).json({
            err: err
        })
    })
});




module.exports = router;