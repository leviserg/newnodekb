const express = require('express');
const router = express.Router();
const perPage = 3;
let myProtocol = require('../models/protocol');

let myDevice = require('../models/device');

    // =========== Get Pagination ============

    router.get('/:page', (req, res) => {

        const options = {
            page: parseInt(req.params.page),
            limit: perPage,
            populate: 'protocol',
            sort:{_id:-1}
        };

        myDevice.paginate({}, options, (err, data) => {
            if(err){
                return console.error(err);
            }
            else{         
                res.render('index', {
                    pagetitle:'Digital Interface Devices',
                    devices: data.docs,
                    total: data.total,
                    limit: data.limit,
                    pages: data.pages,
                    curpage: data.page
                });
            }
        });
    });

    router.get('/', (req, res) => {

        // myDevice.find((err, data) => {
        //     if(err){
        //         return console.error(err);
        //     }
        //     else{
        //         res.render('index', {
        //             pagetitle:'Digital Inteface Devices',
        //             devices: data
        //         });
        //     }
        // }).populate('protocol').sort({_id:-1});
    
       const options = {
           page: 1,
           limit: perPage,
           populate: 'protocol',
           sort:{_id:-1}
       };
    
       myDevice.paginate({}, options, (err, data) => {
            if(err){
                return console.error(err);
            }
            else{         
                res.render('index', {
                    pagetitle:'Digital Inteface Devices',
                    devices: data.docs,
                    total: data.total,
                    limit: data.limit,
                    pages: data.pages,
                    curpage: data.page
                });
                //return res.json(data); // for POSTman
                    // -- example --
                    // "docs": {data json array},
                    // "total": 7,
                    // "limit": 3,
                    // "page": 1,
                    // "pages": 3
            }
        });
    });

    module.exports = router;
