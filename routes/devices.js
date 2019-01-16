const express = require('express');
const router = express.Router();
const fs = require('fs');

let myProtocol = require('../models/protocol');
let myDevice = require('../models/device');

    // Add Device - new Page
    router.get('/add', ensureAuthenticated, (req, res) => {
        myProtocol.find((err, data) => {
            if(err){
                return console.error(err);
            }
            else{
                res.render('add_device', {
                    pagetitle:'Add Device',
                    protocols: data
                });
            }
        });
    });
    
    // Add Device Submit POST Route
    router.post('/add', (req, res) => {    
/*
        req.checkBody('title', 'Title is required').notEmpty();
        req.checkBody('protocol', 'Protocol is required').notEmpty();
        req.checkBody('description', 'Description is required').notEmpty();
    
        let errors = req.validationErrors();
    
        if(errors){
            myProtocol.find((err, data) => {
                if(err){
                    return console.error(err);
                }
                else{
                    res.render('add_device', {
                        pagetitle:'Add Device',
                        protocols: data,
                        errors: errors
                    });
                }
            });
/*      
        }
        else{
*/     
            let device = new myDevice();
            device.title = req.body.title;
            device.protocol = req.body.protocol;
            device.description = req.body.description;

            let xDate = new Date();
            device.date_ = xDate.toJSON();
            device.save((err) => {
                if(err){
                    console.log(err);
                    return false;
                } else {
                    if(req.files){
                        let file = req.files.devimg;
                        file.mv('./public/images/' + device._id + '.jpg', (err)=>{
                            if(err){
                                console.log(err);
                            }
                            else {
                                req.flash('success', 'Device Added');
                                res.redirect('/');
                            }
                        });
                    }
                    else{
                        req.flash('danger', 'Image not uploaded');
                        res.redirect('/');
                    }
                }
            });
//      }       
    });

    // Get Single Device Data
    router.get('/:id', (req, res) => {
        //console.log(req.user._id);
        myDevice.findById(req.params.id, (err, data) => {
            if(err){
                return console.error(err);
            }
            else{
                myProtocol.find((err, prdata) => {
                    if(err){
                        return console.error(err);
                    }
                    else{
                        res.render('device', {
                            protocols: prdata,
                            showDevice: data
                        });
                    }
                })
            }
        }).populate('protocol');
    });

    // Get Single Device Data From Ajax for Modal
    router.get('/modal/:id', ensureAuthenticated, (req, res) => {
        //console.log(req.user._id);
        myDevice.findById(req.params.id, (err, data) => {
            if(err){
                return console.error(err);
            }
            else{
                myProtocol.find((err, prdata) => {
                    if(err){
                        return console.error(err);
                    }
                    else{
                        return res.json({
                            protocols: prdata,
                            showDevice: data
                        });
                    }
                })
            }
        }).populate('protocol');
    });

    // Edit Submit POST Route
    router.post('/:id', (req, res) => {
        let device = {};
            device.title = req.body.title;
            device.protocol = req.body.protocol;
            device.description = req.body.description;
            let xDate = new Date();
            device.date_ = xDate.toJSON();
        let query = {_id:req.params.id}; 
            myDevice.updateOne(query, device, (err) => {
                if(err){
                    console.log(err);
                } else {
                    if(req.files){
                        let file = req.files.devimg;
                        file.mv('./public/images/' + query._id + '.jpg', (err)=>{
                            if(err){
                                console.log(err);
                            }
                            else {
                                req.flash('success', 'Device Data has been updated');
                                res.redirect('/');
                            }
                        });
                    }
                    else{
                        req.flash('success', 'Device Data updated / Image not updated');
                        res.redirect('/');
                    }
/*
                    req.flash('success', 'Device Data has been updated');
                    res.redirect('/');
*/                    
                }
            });
    });
    
    
    // DELETE Route
    router.delete('/:id', (req, res) => {
        if(!req.user._id){
            res.status(500).send();
        } else {
            let query = {_id:req.params.id};
            let path = './public/images/' + query._id + '.jpg';
           myDevice.deleteOne(query, (err) => {
               if(err){
                   console.log(err);
               }
                fs.unlink(path, function() {
                    res.send ({
                        status: "200",
                        responseType: "string",
                        response: "Deleted..."
                    });
                });
            });
        }
    });

    function ensureAuthenticated(req, res, next){
        if(req.isAuthenticated()){
            return next();
        } else {
            req.flash('danger', 'Please login');
            res.redirect('/users/login');
        }
    }

module.exports = router;
    