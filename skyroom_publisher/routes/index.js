
/*
 * GET home page.
 */

exports.index = function(req, res){

	console.log("main page requested");

	var templateData = {
		title : "skyroom"
	}

  res.render('index.js', templateData);
};

exports.draw = function(req,res){

	console.log("main page requested");

	var templateData = {
		title : "skyroom"
	}

  res.render('index.js', templateData);

};