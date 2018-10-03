const User = require('../models/user.js');

module.exports = function(app) {
	app.get('/scoreservice',(req, res) => {
		User.getScores((err, data) => {
			res.status(200).json(data);
		})
	});

	app.post('/scoreservice', (req, res) => {
	    	//console.log(req.body);
	    	const dataScore = {
	    		id_score: null,
	    		score: req.body.score,
	    		user_id: req.body.user_id,
	    		service_id: req.body.service_id,
	    		service: req.body.service
	    	};

	    	User.insertScore(dataScore, (err, data) => {
	    		if (data && data.insertId){
	    			res.json({
	    				success: true,
	    				msg: 'puntuado',
	    				data: data
	    			})

	    		}else{
	    			res.status(500).json({
	    				success: false,
	    				msg: 'Error'
	    			})
	    		}


	    	})


	})

	app.put('/scoreservice', (req, res) => {
		const dataScore = {
	    		id_score: req.body.id_score,//id_score: req.params.id_score
	    		score: req.body.score,
	    		user_id: req.body.user_id,
	    		service_id: req.body.service_id,
	    		service: req.body.service
	    	};
		User.updateScore(dataScore, (err, data) => {
			if (data && data.msg) {
				res.json(data)
			}else{
				res.json({
					success:false,
					msg: 'error'
				})
			}
		})
	})


	app.delete('/scoreservice/:id_score', (req, res) => {
		User.deleteScore(req.params.id_score, (err, data) => {
			if (data && data.msg === 'eliminado' || data.msg === 'noExiste') {
				res.json({
					success: true,
					data
				})
			}else{
				res.status(500).json({
					msg: 'Error'
				})
			}
		})
	})
}



