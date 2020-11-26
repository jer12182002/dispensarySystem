const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors());
app.use ((req,res,next)=> {
	/*var err = new Error("Not Found");
   	err.status = 404;
   	next(err);*/

	// Website you wish to allow to connect
	res.setHeader("Access-Control-Allow-Origin", "*");

	// Request methods you wish to allow
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");

	// Request headers you wish to allow
	res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers,X-Access-Token,XKey,Authorization");

	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	// Pass to next layer of middleware
	next();
})



const database_config = {
	host:"localhost",
	user: "root", 
	password: "",
	database: "dispensarysystem",
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

	connection.on("err", err=> {
		console.log("database error", err);
		if(err.code === "PROTOCOL_CONNECTION_LOST") {
			handleDisconnect();
		} else {
			throw err;
		}
	}) 
}



app.get("/inventory/loadallinventoryitems",(rea,res)=> {
	let sqlQuery = "SELECT * FROM INVENTORY ORDER BY TYPE, ENGLISH_NAME;";

	connection.query(sqlQuery, (err,result) => {
		if(err) {
			console.log(err);
		}else {
			return res.json(result);
		}
	})
});



app.get("/inventory/additem/loadtypelist", (req,res) => {
	let sqlQuery = "SELECT * FROM ITEM_TYPE_LIST;";

	connection.query(sqlQuery, (err, result) =>{
		if(err) {
			console.log(err);
		}else {
			return res.json({result});
		}
	})
})


app.post ("/inventory/updateitem",(req,res)=> {
	console.log(req.body.updateItem);
	let updateItem = req.body.updateItem;

	let sqlQueries = `UPDATE INVENTORY SET ENGLISH_NAME="${charCheck(updateItem.ENGLISH_NAME)}",CHINESE_NAME="${charCheck(updateItem.CHINESE_NAME)}",TYPE="${charCheck(updateItem.TYPE)}", RATIO="${updateItem.RATIO}", QTY="${updateItem.QTY}",RENDE_PRICE="${updateItem.RENDE_PRICE}",STUDENT_PRICE="${updateItem.STUDENT_PRICE}",PROFESSOR_PRICE="${updateItem.PROFESSOR_PRICE}" WHERE ID = "${updateItem.ID}";`;
		sqlQueries += "SELECT * FROM INVENTORY;"

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


app.delete("/inventory/deleteitem",(req,res)=>{
	let deleteItemId = req.headers.id;
	let sqlQueries = `DELETE FROM INVENTORY WHERE ID = "${deleteItemId}";`;
		sqlQueries += "SELECT * FROM INVENTORY;"
	
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

app.post("/inventory/additem",(req,res)=> {
	let itemInfo = req.body;
	let sqlQueries = `INSERT INTO INVENTORY (ENGLISH_NAME, CHINESE_NAME, TYPE, RATIO, QTY, RENDE_PRICE, STUDENT_PRICE, PROFESSOR_PRICE) VALUES("${charCheck(itemInfo.ENGLISH_NAME)}","${charCheck(itemInfo.CHINESE_NAME)}", "${charCheck(itemInfo.TYPE)}", "${itemInfo.RATIO}","${itemInfo.QTY}", "${itemInfo.RENDE_PRICE}","${itemInfo.STUDENT_PRICE}","${itemInfo.PROFESSOR_PRICE}");`;
		sqlQueries += "SELECT * FROM INVENTORY;"

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

app.post("/filteritemtyping",(req,res) => {
	let inputItemName = req.body.input;

	let sqlQuery = `SELECT * FROM INVENTORY WHERE LOWER(CONCAT(ENGLISH_NAME,CHINESE_NAME)) LIKE LOWER("%${charCheck(inputItemName)}%") ORDER BY TYPE, ENGLISH_NAME;`;
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


app.post("/saveorder", (req,res) => {
	let orderInfo = req.body.newOrderInfo;
	let sqlQueries = "";
	
	//If orderId exists, it means the order has been stored before. Then we need to use "UPDATE"
	//If not, then "INSERT" a new one, and get ORDER_ID by orderId.

	//IF order status is "RECEIPT" then decrease the item QTY.

	if(orderInfo.orderId) {
		//Order has been saved before, therefore. update order
		sqlQueries += `UPDATE order_info SET FORMULA = "${charCheck(orderInfo.formula)}", DATE = "${charCheck(orderInfo.date)}" ,CUSTOMER = "${charCheck(orderInfo.customer)}", ADDRESS = "${charCheck(orderInfo.address)}", PHONE = "${charCheck(orderInfo.phone)}", EMAIL = "${charCheck(orderInfo.email)}", STATUS = "${charCheck(orderInfo.orderStatus)}",TOTAL_GRAM = "${orderInfo.totalGram}", DOSAGE_PER_DAY = "${orderInfo.dosagePerDay}", DAY_PER_SESSION = "${orderInfo.dayPerSession}", DISCOUNT_PRICE = "${orderInfo.discountPrice}", DISCOUNT_PERCENTAGE = "${orderInfo.discountPercentage}", BOTTLE_FEE = "${orderInfo.bottleFee}", TABLET_FEE = "${orderInfo.tabletFee}", DELIVERY_FEE = "${orderInfo.deliveryFee}", TAX = "${orderInfo.tax}", NOTE = "${charCheck(orderInfo.orderNote)}" WHERE ORDER_ID = "${orderInfo.orderId}";`;
		sqlQueries += `DELETE FROM order_item_list WHERE ORDER_ID = "${orderInfo.orderId}";`;

		if(orderInfo.orderItemList.length) {
			if(orderInfo.orderStatus === "Receipt") {
				orderInfo.orderItemList.forEach(item => {
					sqlQueries += `INSERT INTO order_item_list VALUES ("${orderInfo.orderId}", "${item.ID}", "${charCheck(item.ENGLISH_NAME)}", "${charCheck(item.CHINESE_NAME)}", "${charCheck(item.TYPE)}", "${item.RATIO}", "${item.QTY}", "${item.RENDE_PRICE}", "${item.STUDENT_PRICE}","${item.PROFESSOR_PRICE}","${item.raw_gram}", "${item.extract_gram}", "${item.final_price}");`;
					sqlQueries += `UPDATE inventory SET QTY = QTY - "${item.extract_gram}" WHERE ID = "${item.ID}";`;
				})
			}else {
				orderInfo.orderItemList.forEach(item => {
					sqlQueries += `INSERT INTO order_item_list VALUES ("${orderInfo.orderId}", "${item.ID}", "${charCheck(item.ENGLISH_NAME)}", "${charCheck(item.CHINESE_NAME)}", "${charCheck(item.TYPE)}", "${item.RATIO}", "${item.QTY}", "${item.RENDE_PRICE}", "${item.STUDENT_PRICE}","${item.PROFESSOR_PRICE}","${item.raw_gram}", "${item.extract_gram}", "${item.final_price}");`;
				})
			}
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
			
			sqlQueries += `INSERT INTO order_info (FORMULA, ACCOUNT, DATE, CUSTOMER, ADDRESS, PHONE, EMAIL, STATUS,TOTAL_GRAM, DOSAGE_PER_DAY, DAY_PER_SESSION, DISCOUNT_PRICE, DISCOUNT_PERCENTAGE, BOTTLE_FEE, TABLET_FEE, DELIVERY_FEE, TAX, NOTE) VALUES ("${charCheck(orderInfo.formula)}" ,"${charCheck(orderInfo.account)}", "${charCheck(orderInfo.date)}", "${charCheck(orderInfo.customer)}", "${charCheck(orderInfo.address)}", "${charCheck(orderInfo.phone)}", "${charCheck(orderInfo.email)}", "${charCheck(orderInfo.orderStatus)}", "${orderInfo.totalGram}", "${orderInfo.dosagePerDay}", "${orderInfo.dayPerSession}", "${orderInfo.discountPrice}", "${orderInfo.discountPercentage}", "${orderInfo.bottleFee}", "${orderInfo.tabletFee}", "${orderInfo.deliveryFee}", "${orderInfo.tax}", "${charCheck(orderInfo.orderNote)}");`;

			connection.query(sqlQueries, (err,result1)=> {
				if(err) {
					return connection.rollback(()=>{
						throw err;
					})

				}else {
					let insertedOrderId = result1.insertId;
					let sqlQueries2 = "";

					if(orderInfo.orderItemList.length) {
						if(orderInfo.orderStatus === "Receipt") {
							orderInfo.orderItemList.forEach(item => {
								sqlQueries2 += `INSERT INTO order_item_list VALUES ("${insertedOrderId}", "${item.ID}", "${charCheck(item.ENGLISH_NAME)}", "${charCheck(item.CHINESE_NAME)}", "${charCheck(item.TYPE)}", "${item.RATIO}", "${item.QTY}", "${item.RENDE_PRICE}", "${item.STUDENT_PRICE}","${item.PROFESSOR_PRICE}","${item.raw_gram}", "${item.extract_gram}", "${item.final_price}");`;
								sqlQueries2 += `UPDATE inventory SET QTY = QTY - "${item.extract_gram}" WHERE ID = "${item.ID}";`;
							})
						}else {
							orderInfo.orderItemList.forEach(item => {
								sqlQueries2 += `INSERT INTO order_item_list VALUES ("${insertedOrderId}", "${item.ID}", "${charCheck(item.ENGLISH_NAME)}", "${charCheck(item.CHINESE_NAME)}", "${charCheck(item.TYPE)}", "${item.RATIO}", "${item.QTY}", "${item.RENDE_PRICE}", "${item.STUDENT_PRICE}","${item.PROFESSOR_PRICE}","${item.raw_gram}", "${item.extract_gram}", "${item.final_price}");`;
							})
						}

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


app.delete("/deleteorder", (req, res) => {

	let orderId = req.query.orderId;
	let account = req.query.account;

	let sqlQueries1 = `DELETE FROM order_info WHERE ORDER_ID = "${orderId}" AND ACCOUNT = "${account}";`;
	let sqlQueries2 = `DELETE FROM order_item_list WHERE ORDER_ID = "${orderId}";`;

	connection.beginTransaction(err => {
		if(err) {
			throw err;
		}

		connection.query(sqlQueries1, (err1, result1) => {
			
			if(result1.affectedRows) {
				connection.query(sqlQueries2, (err2, result2) => {
					if(err2) {
						return connection.rollback();
					}else {
						connection.commit(err3 => {
							if(err3) {
								return connection.rollback();
							}
							return res.json({result2})
						})
					}
				})
			}else {
				if(err1) {
					throw err1;
				}
				else {
					throw "dataError Nothing has been deleted";
				}
			}
		})
	})
	
})


app.post("/orders/orderreview/duplicateorder", (req,res) => {

	let orderId = req.body.orderId;
	let account = req.body.account;

	connection.beginTransaction(err => {
		if(err) {
			throw err;
		}

		let sqlQueries = `INSERT INTO order_info (FORMULA, ACCOUNT, CUSTOMER, ADDRESS, PHONE, EMAIL, STATUS, TOTAL_GRAM, DOSAGE_PER_DAY, DAY_PER_SESSION, DISCOUNT_PRICE, DISCOUNT_PERCENTAGE, BOTTLE_FEE, TABLET_FEE, DELIVERY_FEE, TAX, NOTE) SELECT FORMULA, ACCOUNT, CUSTOMER, ADDRESS, PHONE, EMAIL, "Quote", TOTAL_GRAM, DOSAGE_PER_DAY, DAY_PER_SESSION, DISCOUNT_PRICE, DISCOUNT_PERCENTAGE, BOTTLE_FEE, TABLET_FEE, DELIVERY_FEE, TAX, NOTE FROM order_info WHERE ORDER_ID = "${orderId}";`;
		

		connection.query(sqlQueries, (err1, result1) => {
			if(err1) {
				throw err1;
			}else {
				let insertedId = result1.insertId;
				let sqlQueries2 = "";
			
				switch(account) {
					case "RenDeInc":
						sqlQueries2 = `INSERT INTO order_item_list (ORDER_ID, ITEM_ID, ENGLISH_NAME, CHINESE_NAME, TYPE, RATIO, QTY, RENDE_PRICE, STUDENT_PRICE, PROFESSOR_PRICE, raw_gram, extract_gram, final_price) SELECT "${insertedId}", i.ID, i.ENGLISH_NAME, i.CHINESE_NAME, i.TYPE, i.RATIO, i.QTY, i.RENDE_PRICE, i.STUDENT_PRICE, i.PROFESSOR_PRICE, o.raw_gram, o.extract_gram, i.RENDE_PRICE*o.extract_gram FROM order_item_list o RIGHT JOIN inventory i ON o.ITEM_ID = i.ID WHERE ORDER_ID = "${orderId}";`;
					break;
					
					case "Student":
						sqlQueries2 = `INSERT INTO order_item_list (ORDER_ID, ITEM_ID, ENGLISH_NAME, CHINESE_NAME, TYPE, RATIO, QTY, RENDE_PRICE, STUDENT_PRICE, PROFESSOR_PRICE, raw_gram, extract_gram, final_price) SELECT "${insertedId}", i.ID, i.ENGLISH_NAME, i.CHINESE_NAME, i.TYPE, i.RATIO, i.QTY, i.RENDE_PRICE, i.STUDENT_PRICE, i.PROFESSOR_PRICE, o.raw_gram, o.extract_gram, i.STUDENT_PRICE*o.extract_gram FROM order_item_list o RIGHT JOIN inventory i ON o.ITEM_ID = i.ID WHERE ORDER_ID = "${orderId}";`;
					break;
					
					case "Professor":
						sqlQueries2 = `INSERT INTO order_item_list (ORDER_ID, ITEM_ID, ENGLISH_NAME, CHINESE_NAME, TYPE, RATIO, QTY, RENDE_PRICE, STUDENT_PRICE, PROFESSOR_PRICE, raw_gram, extract_gram, final_price) SELECT "${insertedId}", i.ID, i.ENGLISH_NAME, i.CHINESE_NAME, i.TYPE, i.RATIO, i.QTY, i.RENDE_PRICE, i.STUDENT_PRICE, i.PROFESSOR_PRICE, o.raw_gram, o.extract_gram, i.PROFESSOR_PRICE*o.extract_gram FROM order_item_list o RIGHT JOIN inventory i ON o.ITEM_ID = i.ID WHERE ORDER_ID = "${orderId}";`;
					break;
				}

				connection.query(sqlQueries2, (err2, result2) => {
					if(err2) {
						return connection.rollback(()=> {
							throw err;
						})
					}
					else {
						connection.commit(err3 => {
							if(err3) {
								return connection.rollback(err3 => {
									throw err;
								})
							}else {
								return res.json({orderId : insertedId});
							}
						})
					}
				})	
			
			}	
		})
	})
})




app.get("/loadallorders", (req,res)=> {
	let sqlQuery = "SELECT * FROM `order_info` ORDER BY STATUS, ORDER_ID;";

	connection.query(sqlQuery, (err, result)=> {
		if(err) {
			console.log(err);
		}else {
			return res.json({result});
		}
	})
})



app.get("/loadsavedorder", (req, res)=> {
	let order_id = req.query.order_id;
	let sqlQuery = `SELECT * FROM order_info O LEFT join order_item_list I on O.ORDER_ID = I.ORDER_ID WHERE O.ORDER_ID = "${order_id}";`;

	connection.query(sqlQuery, (err,result)=> {
		if(err) {
			console.log(err);
		}else {
			return res.json(result);
		}
	})
})	


//*********************** Message LoggedingUser (load unread Message number) *********************
app.get("/message/getunreadmessagenumber", (req,res) => {
	let accountId = req.query.account_id;
	
	let sqlQuery = `SELECT SUM(UNREAD) AS "UNREADNUMBER" FROM message WHERE RECIPIENT_ID = "${accountId}";`;

	connection.beginTransaction(err => {
		if(err) {
			throw err;
		}
		connection.query(sqlQuery, (err1, result1) => {
			if(err1) {
				return connection.rollback(()=> {
					throw err1;
				})
			}else {
				return res.json(result1);
			}
		})
	})
})

//*********************** Message *******************************
app.post("/message/send", (req,res) => {
	let messageInputInfo = req.body.newMessageInput;

	let sqlQueries = `INSERT INTO message (AUTHOR, AUTHOR_ID, RECIPIENT_ID, MESSAGE) VALUES ("${charCheck(messageInputInfo.author)}", "${messageInputInfo.authorId}", "${messageInputInfo.recipientId}", "${charCheck(messageInputInfo.message)}");`;
	let sqlQueries2 = `SELECT * FROM message WHERE AUTHOR_ID = "${messageInputInfo.authorId}" OR RECIPIENT_ID = "${messageInputInfo.authorId}" ORDER BY TIME;`;
	
	connection.beginTransaction(err => {
		if(err) {
			throw err;
		}

		connection.query(sqlQueries, (err1,result1) => {
			if(err1) {
				return connection.rollback(() => {
					throw err1;
				})
			}else {
				connection.query(sqlQueries2, (err2, result2) => {
					if(err2) {
						throw err2;
					}else {
						connection.commit (err3 => {
							if(err3) {
								return connection.rollback(err3 => {
									throw err3;
								})
							}else {
								return res.json(result2);
							}
						})
					}
				})
			}
		})
	})

})




app.get("/message/getallmessages", (req, res) => {

	let accountId = req.query.account_id;
	
	let	sqlQueries1 = `UPDATE message SET UNREAD = "false" WHERE RECIPIENT_ID = "${accountId}";`;
	let sqlQueries2 = `SELECT * FROM message WHERE AUTHOR_ID = "${accountId}" OR RECIPIENT_ID = "${accountId}" ORDER BY TIME;`;

	connection.beginTransaction(err => {
		if(err) {
			throw err;
		}else {
			connection.query(sqlQueries1,(err1, result1) => {
				if(err1) {
					throw err1;
				}else {
					connection.query(sqlQueries2,(err2, result2) => {
						if(err2) {
							throw err2;
						}else {
							connection.commit(err3 => {
								if(err3) {
									throw err3;
								}else{
									return res.json(result2);
								}
							})
						}
					})
				}
			})
		}

		
	})
})



app.listen(4000,()=> {
	console.log("########## Dispensary System now listening on Port 4000");
	handleDisconnect();
})



const charCheck = (txt) => {
	return txt.replace(/"/g, `'`);
}

