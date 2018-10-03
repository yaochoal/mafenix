const mysql = require('mysql');

connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '1234',
	database: 'scores'
});

let userModel = {}; //add methods

userModel.getScores = (callback) => {
	if (connection) {
		connection.query(
			'SELECT * FROM scoreresource ORDER BY id_score', 
			(err, rows) => {
			if (err) {
				throw err;
			}else{
				callback(null, rows);
			}
		})

	}
};

userModel.insertScore = (dataScore,callback) => {
    if(connection){
    	connection.query('INSERT INTO scoreresource SET ?', dataScore, 
    		(err, result) => {
    			if (err) {
    				throw err;
    			}else{
    				callback(null, {
    					'insertId': result.insertId
    				})
    			}
    		})
    }
};

userModel.updateScore = (dataScore, callback) => {
	if (connection) {
		const sql = `
		UPDATE scoreresource SET 
		score = ${connection.escape(dataScore.score)},
		user_id = ${connection.escape(dataScore.user_id)},
		service_id = ${connection.escape(dataScore.service_id)},
		service = ${connection.escape(dataScore.service)}
		WHERE id_score = ${dataScore.id_score}`;

		connection.query(sql, (error,result) => {
			if (error) {
				throw error;
			}else{
				callback(null, {
					"msg": "success"

				});
			}
		})
	}
};


userModel.deleteScore = (id_score, callback) => {
	if (connection) {
		let sql = `
		SELECT * FROM scoreresource WHERE id_score = ${connection.escape(id_score)}`;
		connection.query(sql, (err, row) => {
			if (row) {
				let sql =`
				DELETE FROM scoreresource WHERE id_score = ${id_score}`;
				connection.query(sql, (err, result) => {
					if (err) {
						throw err;
					}else{
						callback(null, {
							msg: 'eliminado'
						})
					}
				})
			}else{
				callback(null, {
					msg: 'noExiste'
				})
			}
		})
	}

}



module.exports = userModel;