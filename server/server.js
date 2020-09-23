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


app.get('/inventory',(req,res)=> {
	let sqlQuery = 'SELECT * FROM INVENTORY;';

	connection.query(sqlQuery, (err, result) => {
		if(err) {
			console.log(err);
		}else {
			return res.json({inventory:result[0]});
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


app.post('/inventory/additem',(req,res)=> {
	let itemInfo = req.body;
	let sqlQuery = `INSERT INTO INVENTORY (ENGLISH_NAME, CHINESE_NAME, TYPE, QTY, RENDE_PRICE, STUDENT_PRICE, PROFESSOR_PRICE) VALUES('${itemInfo.ENGLISH_NAME}','${itemInfo.CHINESE_NAME}', '${itemInfo.TYPE}','${itemInfo.QTY}', '${itemInfo.RENDE_PRICE}','${itemInfo.STUDENT_PRICE}','${itemInfo.PROFESSOR_PRICE}');`;

	connection.query(sqlQuery, (err,result) => {
		if(err) {
			return connection.rollback(()=>{
				throw err;
			})
		}else {
			return res.json({status: 'success'});
		}
	})
})	



app.get('/inventory/loadallinventoryitems',(rea,res)=> {
	let sqlQuery = 'SELECT * FROM INVENTORY;';

	connection.query(sqlQuery, (err,result) => {
		if(err) {
			console.log(err);
		}else {
			return res.json(result);
		}
	})
});



handleDisconnect();
app.listen(4000,()=> {
	console.log("########## Dispensary System now listening on Port 4000");
})

