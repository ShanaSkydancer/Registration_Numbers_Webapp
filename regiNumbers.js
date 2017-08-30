module.exports = (regiNumModel) => {
'use strict';

//Use debugger with node-inspector
//Used it at the beginning of my code but it can go anywhere or I can create a break in the inspector
debugger;

var allRegiInputs = [];
var filteredRegiList = [];
var regiData = "";

    const index = (req, res) => {
        res.render("index", regiNum);
    };

    const add = (req, res, next) => {
        let regiInput = req.body.regiInput;

        if(!regiInput){
            req.flash('error', 'Registration should not be blank!')
        } else {
            regiNumModel.findOne({regiNum: regiInput}, (err, result) => {
                if (err){
                    return next(err);
                    console.log('Error trying to find registration number');                    
                } else {
                    if (!result) {
                        console.log(result);
                        var newRegiNum = new regiNumModel({
                            regiNum: regiInput
                        });
                        newRegiNum.save((err) => {
                            if (err) {
                                return next(err);
                            } else {
                                console.log('Successfully added!');
                                req.flash('info', 'Successfully added!')                                
                                regiNumModel.find({})
                                    .then((collection) => {
                                        res.render("index", {
                                            regiDisplay : collection
                                        });
                                    });
                            };
                        });
                    } else {
                        req.flash('error', 'Number has already been added!');
                        res.render('index');
                    }
                };
            });
        };
    };

    const filter = (req, res) => {
        var regiInput = req.body.regiInput;
        var radioButt = req.body.radioButt;
        var filterButton = req.body.filterButton;

        regiNumModel.find({})
            .then((allRegiInputs) => {

                filteredRegiList = [];

                for(let i = 0; i < allRegiInputs.length; i++) {
                    let currentRegiNum = allRegiInputs[i].regiNum;
                    if (radioButt === 'capetown' && currentRegiNum.startsWith('CA')) {
                        filteredRegiList.push(allRegiInputs[i]);
                    } else if (radioButt === 'bellville' && currentRegiNum.startsWith('CY')) {
                        filteredRegiList.push(allRegiInputs[i]);
                    } else if (radioButt === 'malmesbury' && currentRegiNum.startsWith('CJ')) {
                        filteredRegiList.push(allRegiInputs[i]);
                    } else if (radioButt === 'all') {
                        filteredRegiList.push(allRegiInputs[i]);
                    };
                };

                regiData = {regiDisplay : filteredRegiList};
                res.render("index", regiData);
            });
    };

    return {
        index,
        add,
        filter
    }
};