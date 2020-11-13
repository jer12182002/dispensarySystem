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
	let sqlQuery = 'SELECT * FROM INVENTORY ORDER BY TYPE, ENGLISH_NAME;';

	connection.query(sqlQuery, (err,result) => {
		if(err) {
			console.log(err);
		}else {
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

	let sqlQueries = `UPDATE INVENTORY SET ENGLISH_NAME='${updateItem.ENGLISH_NAME}',CHINESE_NAME='${updateItem.CHINESE_NAME}',TYPE='${updateItem.TYPE}', RATIO='${updateItem.RATIO}', QTY='${updateItem.QTY}',RENDE_PRICE='${updateItem.RENDE_PRICE}',STUDENT_PRICE='${updateItem.STUDENT_PRICE}',PROFESSOR_PRICE='${updateItem.PROFESSOR_PRICE}' WHERE ID = '${updateItem.ID}';`;
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
	let sqlQueries = `INSERT INTO INVENTORY (ENGLISH_NAME, CHINESE_NAME, TYPE, RATIO, QTY, RENDE_PRICE, STUDENT_PRICE, PROFESSOR_PRICE) VALUES('${itemInfo.ENGLISH_NAME}','${itemInfo.CHINESE_NAME}', '${itemInfo.TYPE}', '${itemInfo.RATIO}','${itemInfo.QTY}', '${itemInfo.RENDE_PRICE}','${itemInfo.STUDENT_PRICE}','${itemInfo.PROFESSOR_PRICE}');`;
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

app.post('/filteritemtyping',(req,res) => {
	let inputItemName = req.body.input;

	let sqlQuery = `SELECT * FROM INVENTORY WHERE LOWER(CONCAT(ENGLISH_NAME,CHINESE_NAME)) LIKE LOWER('%${inputItemName}%') ORDER BY TYPE, ENGLISH_NAME;`;
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


app.post('/saveorder', (req,res) => {
	let orderInfo = req.body.newOrderInfo;
	let sqlQueries = '';
	//If orderId exists, it means the order has been stored before. Then we need to use "UPDATE"
	//If not, then "INSERT" a new one, and get ORDER_ID by orderId.

	//IF order status is 'RECEIPT' then decrease the item QTY.

	if(orderInfo.orderId) {
		//Order has been saved before, therefore. update order
		sqlQueries += `UPDATE order_info SET FORMULA = '${orderInfo.formula}', DATE = '${orderInfo.date}' ,CUSTOMER = '${orderInfo.customer}', ADDRESS = '${orderInfo.address}', PHONE = '${orderInfo.phone}', EMAIL = '${orderInfo.email}', STATUS = '${orderInfo.status}',TOTAL_GRAM = '${orderInfo.totalGram}', DOSAGE_PER_DAY = '${orderInfo.dosagePerDay}', DAY_PER_SESSION = '${orderInfo.dayPerSession}', DISCOUNT_PRICE = '${orderInfo.discountPrice}', DISCOUNT_PERCENTAGE = '${orderInfo.discountPercentage}', BOTTLE_FEE = '${orderInfo.bottleFee}', TABLET_FEE = '${orderInfo.tabletFee}', DELIVERY_FEE = '${orderInfo.deliveryFee}', TAX = '${orderInfo.tax}', NOTE = '${orderInfo.orderNote}' WHERE ORDER_ID = '${orderInfo.orderId}';`;
		sqlQueries += `DELETE FROM order_item_list WHERE ORDER_ID = '${orderInfo.orderId}';`;

		if(orderInfo.orderItemList.length) {
			orderInfo.orderItemList.forEach(item => {
				sqlQueries += `INSERT INTO order_item_list VALUES ('${orderInfo.orderId}', '${item.ID}', '${item.ENGLISH_NAME}', '${item.CHINESE_NAME}', '${item.TYPE}', '${item.RATIO}', '${item.QTY}', '${item.RENDE_PRICE}', '${item.STUDENT_PRICE}','${item.PROFESSOR_PRICE}','${item.raw_gram}', '${item.extract_gram}', '${item.final_price}');`;
			})
		}

		connection.beginTransaction(err => {
			if(err) {
				throw err;
			}

			connection.query(sqlQueries,(err,result) => {
				if(err) {
					return connection.rollback(() => {
						throw err;
					})
				}else {
					connection.commit(err => {
						if(err) {
							return connection.rollback(err => {
								throw err;
							})
						}else {
							return res.json({orderId : orderInfo.orderId});
						}
					})
				}
			})
		})

	}else {
		//order has never been saved before. therefore, insert new order information
		connection.beginTransaction(err => {
			if(err) {
				throw err;
			}
			
			sqlQueries += `INSERT INTO order_info (FORMULA, ACCOUNT, DATE, CUSTOMER, ADDRESS, PHONE, EMAIL, STATUS,TOTAL_GRAM, DOSAGE_PER_DAY, DAY_PER_SESSION, DISCOUNT_PRICE, DISCOUNT_PERCENTAGE, BOTTLE_FEE, TABLET_FEE, DELIVERY_FEE, TAX, NOTE) VALUES ('${orderInfo.formula}' ,${orderInfo.account}', '${orderInfo.date}', '${orderInfo.customer}', '${orderInfo.address}', '${orderInfo.phone}', '${orderInfo.email}', '${orderInfo.status}', '${orderInfo.totalGram}', '${orderInfo.dosagePerDay}', '${orderInfo.dayPerSession}', '${orderInfo.discountPrice}', '${orderInfo.discountPercentage}', '${orderInfo.bottleFee}', '${orderInfo.tabletFee}', '${orderInfo.deliveryFee}', '${orderInfo.tax}', '${orderInfo.orderNote}');`;
			
			connection.query(sqlQueries, (err,result1)=> {
				if(err) {
					return connection.rollback(()=>{
						throw err;
					})

				}else {
					let insertedOrderId = result1.insertId;
					let sqlQueries2 = '';

					if(orderInfo.orderItemList.length) {
						orderInfo.orderItemList.forEach(item => {
							sqlQueries2 += `INSERT INTO order_item_list VALUES ('${insertedOrderId}', '${item.ID}', '${item.ENGLISH_NAME}', '${item.CHINESE_NAME}', '${item.TYPE}', '${item.RATIO}', '${item.QTY}', '${item.RENDE_PRICE}', '${item.STUDENT_PRICE}','${item.PROFESSOR_PRICE}','${item.raw_gram}', '${item.extract_gram}', '${item.final_price}');`;
						})


						connection.query(sqlQueries2,(err,result2) => {
							if(err) {
								return connection.rollback(()=> {
									throw err;
								})
							}else {
								connection.commit(err => {
									if(err) {
										return connection.rollback(()=> {
											throw err;
										})
									}else {
										return res.json({orderId : insertedOrderId});
									}
								})
							}
						})
					}else {
						connection.commit(err => {
							return res.json({orderId : insertedOrderId});
						})
					}
				}
			})	
		})
	}
})



app.get('/loadallorders', (req,res)=> {
	let sqlQuery = 'SELECT * FROM `order_info` ORDER BY STATUS, ORDER_ID;';

	connection.query(sqlQuery, (err, result)=> {
		if(err) {
			console.log(err);
		}else {
			return res.json({result});
		}
	})
})



app.get('/loadsavedorder', (req, res)=> {
	let order_id = req.query.order_id;
	let sqlQuery = `SELECT * FROM order_info O LEFT join order_item_list I on O.ORDER_ID = I.ORDER_ID WHERE O.ORDER_ID = '${order_id}';`;

	connection.query(sqlQuery, (err,result)=> {
		if(err) {
			console.log(err);
		}else {
			return res.json(result);
		}
	})
})	



handleDisconnect();
app.listen(4000,()=> {
	console.log("########## Dispensary System now listening on Port 4000");
})

