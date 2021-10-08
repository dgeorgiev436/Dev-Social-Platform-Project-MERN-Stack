const express = require("express");
const app = express();


app.get("/", (req,res) => {
	res.send("HOME PAGE")
})



const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
	console.log(`SERVER RUNNING ON PORT ${PORT}`)
})