module.exports = () => {
'use strict';

var allregiInputs = [];
var filteredRegiList = [];
var regiData = "";

    const index = (req, res) => {
        regiData = {regiDisplay : allregiInputs};
        res.render("index", regiData);
    }

    const add = (req, res) => {
        var regiInput = req.body.regiInput;

        var foundRegiNum = allregiInputs.find((currentRegiNum) => {
            return currentRegiNum === regiInput;
        });

        if(!regiInput){
            req.flash('error', 'Registration should not be blank!')
        }
        else{
            if (!foundRegiNum){
                allregiInputs.push(regiInput);
                req.flash('info', 'Registration has been added to the list!')
            }
            else{
            req.flash('error', 'Registration number not added!')
            }
        }
        regiData = {regiDisplay : allregiInputs};
        res.render("index", regiData);
        // res.redirect('/reginumbers');
    }

    const filter = (req, res) => {
        var radioButt = req.body.radioButt;

            for(let i = 0; i < allregiInputs.length; i++) {
                let currentRegiNum = allregiInputs[i];
                if (radioButt === 'capetown' && currentRegiNum.startsWith('CA')) {
                    filteredRegiList.push(currentRegiNum);
                } else if (radioButt === 'bellville' && currentRegiNum.startsWith('CY')) {
                    filteredRegiList.push(currentRegiNum);
                } else if (radioButt === 'malmesbury' && currentRegiNum.startsWith('CJ')) {
                    filteredRegiList.push(currentRegiNum);
                } 
                // else if (radioButt === 'all') {
                //     filteredRegiList.push(currentRegiNum);
                // };
            };
            // return filteredRegiList
            regiData = {regiDisplay : filteredRegiList};
            res.render("index", regiData);

    }

    return {
        index,
        add,
        filter
    }
}