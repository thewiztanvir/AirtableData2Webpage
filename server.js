const express = require('express');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const server = require('http').createServer(app);

// Serve the HTML file
app.use(express.static(path.join(__dirname, 'public')));

// Fetch Airtable data using Personal Access Token
const fetchAirtableData = async () => {
    try {
        const response = await axios.get(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_NAME}`, {
            headers: { Authorization: `Bearer ${process.env.AIRTABLE_PAT}` }
        });
        return response.data.records;
    } catch (error) {
        console.error('Error fetching Airtable data:', error);
        return [];
    }
};

// API endpoint to get Airtable data
app.get('/api/data', async (req, res) => {
    const data = await fetchAirtableData();
    res.json(data);
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
