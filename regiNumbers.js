module.exports = function() {
var allregiInputs = [];
var regiData = "";

    const index = function(req, res){
        regiData = {regiDisplay : allregiInputs};
        res.render("index", regiData);
    }

    const add = function(req, res){
        var regiInput = req.body.regiInput;
        var radioButt = req.body.radioButt;
        var enterButton = req.body.enterButton;
        var filterButton = req.body.filterButton;

        var foundRegiNum = allregiInputs.find(function(currentRegiNum){
            return currentRegiNum === regiInput;
        });

        if(!regiInput){
            req.flash('error', 'Registration should not be blank!')
        }
        else{
            if (!foundRegiNum){
                allregiInputs.push(regiInput);
                req.flash('info', 'Registration has already been added to the list!')
            }
            else{
            req.flash('error', 'Registration number not added!')
            }
        }
        regiData = {regiDisplay : allregiInputs};
        res.render("index", regiData);
        // res.redirect('/reginumbers');
    }

    const filter = function(req, res){
        var regiList = {};
        var filterList = "";
        var regiInput = req.body.regiInput;
        var radioButt = req.body.radioButt;
        var enterButton = req.body.enterButton;
        var filterButton = req.body.filterButton;
            for (value in radioButt){
                if (value == 'capetown'){
                    filterList = 'CA'
                }
                if (value == 'bellville'){
                    filterList = 'CY'
                }
                if (value == 'malmesbury'){
                    filterList = 'CJ'
                }
                // else if (value == 'all'){
                    
                // }
            }
            return regiInput.startsWith(filterList);
            res.render("index", regiList);
        };

    return {
        index,
        add,
        filter
    }
}