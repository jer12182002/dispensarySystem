const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors());
app.use ((req,res,next)=> {
	/*var err = new Error('Not Found');
   	err.status = 404;
   	next(err);*/

	// Website you wish to allow to connect
	res.setHeader('Access-Control-Allow-Origin', '*');

	// Request methods you wish to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers you wish to allow
	res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization');

	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	// Pass to next layer of middleware
	next();
})



const database_config = {
	host:'localhost',
	user: 'root', 
	password: '',
	database: 'dispensarysystem',
	multipleStatements: true
}

//re-connect to the database while connection is dead
const handleDisconnect = () => {    
	console.log("Disconnected because of Idle status, begin to re-connect...");
	connection = mysql.createConnection(database_config);

	connection.connect((err)=> {
		if(err) {
			console.log("Error when connectibng to database: ", err);
			setTimeout(handleDisconnect(),2000);
		}
	});

	connection.on('err', err=> {
		console.log('database error', err);
		if(err.code === 'PROTOCOL_CONNECTION_LOST') {
			handleDisconnect();
		} else {
			throw err;
		}
	}) 
}



app.get('/inventory/loadallinventoryitems',(rea,res)=> {
	let sqlQuery = 'SELECT * FROM INVENTORY;';

	connection.query(sqlQuery, (err,result) => {
		if(err) {
			console.log(err);
		}else {
			console.log("loadAllItems");
			return res.json(result);
		}
	})
});



app.get('/inventory/additem/loadtypelist', (req,res) => {
	let sqlQuery = 'SELECT * FROM ITEM_TYPE_LIST;';

	connection.query(sqlQuery, (err, result) =>{
		if(err) {
			console.log(err);
		}else {
			return res.json({result});
		}
	})
})


app.post ('/inventory/updateitem',(req,res)=> {
	console.log(req.body.updateItem);
	let updateItem = req.body.updateItem;

	let sqlQueries = `UPDATE INVENTORY SET ENGLISH_NAME='${updateItem.ENGLISH_NAME}',CHINESE_NAME='${updateItem.CHINESE_NAME}',TYPE='${updateItem.TYPE}',QTY='${updateItem.QTY}',RENDE_PRICE='${updateItem.RENDE_PRICE}',STUDENT_PRICE='${updateItem.STUDENT_PRICE}',PROFESSOR_PRICE='${updateItem.PROFESSOR_PRICE}' WHERE ID = '${updateItem.ID}';`;
		sqlQueries += 'SELECT * FROM INVENTORY;'

	connection.query(sqlQueries, (err,result) => {
		if(err) {
			return connect.rollback(()=> {
				throw err;
			})
		}else {
			return res.json({result});
		}
	})

})


app.delete('/inventory/deleteitem',(req,res)=>{
	let deleteItemId = req.headers.id;
	let sqlQueries = `DELETE FROM INVENTORY WHERE ID = '${deleteItemId}';`;
		sqlQueries += 'SELECT * FROM INVENTORY;'
	
	connection.query(sqlQueries, (err,result)=> {
		if(err){
			return connection.rollback(() => {
				throw err;
			})
		}else {
			return res.json({result});
		}
	})
})

app.post('/inventory/additem',(req,res)=> {
	let itemInfo = req.body;
	let sqlQueries = `INSERT INTO INVENTORY (ENGLISH_NAME, CHINESE_NAME, TYPE, QTY, RENDE_PRICE, STUDENT_PRICE, PROFESSOR_PRICE) VALUES('${itemInfo.ENGLISH_NAME}','${itemInfo.CHINESE_NAME}', '${itemInfo.TYPE}','${itemInfo.QTY}', '${itemInfo.RENDE_PRICE}','${itemInfo.STUDENT_PRICE}','${itemInfo.PROFESSOR_PRICE}');`;
		sqlQueries += 'SELECT * FROM INVENTORY;'

	connection.query(sqlQueries, (err,result) => {
		if(err) {
			return connection.rollback(()=>{
				throw err;
			})
		}else {
			return res.json({result});
		}
	})
})	

app.post('/inventory/additemkeyup',(req,res) => {
	let inputItemName = req.body.input;

	let sqlQuery = `SELECT * FROM INVENTORY WHERE LOWER(CONCAT(ENGLISH_NAME,CHINESE_NAME)) LIKE LOWER('%${inputItemName}%');`;
	connection.query(sqlQuery, (err,result) => {
		if(err) {
			return connection.rollback(()=>{
				throw err;
			})
		}else {
			return res.json({result});
		}
	})
})




handleDisconnect();
app.listen(4000,()=> {
	console.log("########## Dispensary System now listening on Port 4000");
})

