const express = require("express")
const app = express.Router()
const User = require('./user.model')

app.post("/signup",async(req,res)=>{
	const {name,gender,email,password}= req.body
	try{
		const existUser = await User.findOne({email})
		if(existUser){
			res.status(404).send('This email has been used try to another email')
		}else{
			const user = await User.create({
				name,
				gender,
				email,
				password,
			});

			res.send({
				token: `${email} #${password}`
			});
		}
	} catch (el){
		res.status(404).send(el.massage)
	}
})

app.post("/login", async (req, res) => {
	const { email, password } = req.body;
	try {
	  let user = await User.findOne({ email });
	  if (user) {
		if (user.password === password) {
		  res.send({
			token: `${email}#${password}`,
		  });
		} else {
		  res.status(401).send(`password is not match`);
		}
	  } else {
		res.status(404).send("user not found");
	  }
	} catch (e) {
	  res.status(404).send(e.massage);
	}
  });

module.exports = app