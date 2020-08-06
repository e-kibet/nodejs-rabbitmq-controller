const express =  require('express');

const app = express();

app.get("", async function(req, res, next){
	res.json({
		"messaage": "welcome to nodejs rest api"
	})
})

app.listen(6800, async function(req, res, next){
	console.log("Listening for the rest api");
})
