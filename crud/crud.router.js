const express = require("express")
const app = express.Router()
const Record = require('./crud.model');


app.post('/create', async (req, res) => {
	try {
		const { name, description, category, active } = req.body;
		const newRecord = await Record.create({
			name,
			description,
			category,
			active,
		});
		res.json(newRecord);
	} catch (error) {
		res.status(500).json({ error: 'Error creating record.' });
	}
})

app.get('/records', async (req, res) => {
	try {
		const records = await Record.find();
		res.json(records);
	} catch (error) {
		res.status(500).json({ error: 'Error retrieving records.' });
	}

});

app.get('/SingleData/:id', async (req, res) => {
   

	try {
		const parid = req.params.id
		const records = await Record.find({
			_id :parid
		});
		res.send(
			records
		);
	} catch (error) {
		res.status(500).json({ error: 'Error retrieving records.' });
	}


});



app.delete('/deleterecord/:id', async (req, res) => {
	try {
		const { id } = req.params;
		await Record.findByIdAndDelete(id);
		res.json({ message: 'Record deleted successfully.' });
	} catch (error) {
		res.status(500).json({ error: 'Error deleting record.' });
	}


});




app.put('/update-record/:id', async (req, res) => {
	try {
		const { id } = req.params;
		const { name, description, category, active } = req.body;

		const updatedRecord = await Record.findByIdAndUpdate(
			id,
			{ name, description, category, active },
			{ new: true } // Return the updated record
		);

		if (!updatedRecord) {
			return res.status(404).json({ error: 'Record not found.' });
		}

		res.json(updatedRecord);
	} catch (error) {
		res.status(500).json({ error: 'Error updating record.' });
	}
});


module.exports = app