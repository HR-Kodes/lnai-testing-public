// const express = require('express');
// const { client, databaseId, containerId } = require('../utils/database');
// const axios = require('axios');
// const router = express.Router();

// // POST /details
// router.post('/', async (req, res) => {
//     const data = req.body;
//     // const file = req.file;

//     try {
//         const database = client.database(databaseId);
//         const container = database.container(containerId);

//         await container.items.create(data);
//         res.status(200).json({ message: "Data added successfully" });
//     } catch (error) {
//         console.error("Error adding data", error);
//         res.status(500).json({ message: "Failed to add data" });
//     }
// });

// // GET /details/:id
// router.get('/:id', async (req, res) => {
//     const { id } = req.params;
//     try {
//         const database = client.database(databaseId);
//         const container = database.container(containerId);

//         const querySpec = {
//             query: 'SELECT * from c WHERE c.id = @id',
//             parameters: [
//                 {
//                     name: '@id',
//                     value: id
//                 }
//             ]
//         };

//         const { resources: data } = await container.items.query(querySpec).fetchAll();

//         if (data.length === 0) {
//             res.status(404).json({ message: 'Data not found for the provided id' });
//         } else {
//             res.status(200).json(data[0]); // Sending a successful response with status code 200
//         }
//     } catch (error) {
//         console.error("Error retrieving data", error);
//         res.status(500).json({ message: 'Error retrieving the data' });
//     }
// });

// module.exports = router;
const express = require('express');
const fs = require('fs'); // Import the fs module
const router = express.Router();

// POST /details
router.post('/', async (req, res) => {
    const data = req.body;

    try {
        // Save the JSON data to a local file
        fs.writeFileSync('/home/pratik/Desktop/LN/nikhil spice/data.json', JSON.stringify(data));

        res.status(200).json({ message: "Data saved locally successfully" });
    } catch (error) {
        console.error("Error saving data locally", error);
        res.status(500).json({ message: "Failed to save data locally" });
    }
});

module.exports = router;
