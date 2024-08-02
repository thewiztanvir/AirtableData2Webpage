const express = require('express');
const axios = require('axios');
const path = require('path');
const dotenv = require('dotenv');
const http = require('http');
const WebSocket = require('ws');
const bodyParser = require('body-parser');

dotenv.config();

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(bodyParser.json());

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

// Function to send data to all connected clients
const broadcastData = async () => {
    const data = await fetchAirtableData();
    const message = JSON.stringify(data);
    wss.clients.forEach(client => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(message);
        }
    });
};

// Fetch and broadcast data every 10 seconds
setInterval(broadcastData, 10000);

wss.on('connection', (ws) => {
    console.log('New client connected');
    ws.on('close', () => {
        console.log('Client disconnected');
    });
});

// Add data to a different Airtable table
const addAirtableData = async (name, age) => {
    try {
        const response = await axios.post(`https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_NEW_TABLE_NAME}`, {
            fields: {
                Name: name,
                Age: age
            }
        }, {
            headers: { Authorization: `Bearer ${process.env.AIRTABLE_PAT}` }
        });
        return response.data;
    } catch (error) {
        console.error('Error adding Airtable data:', error.response.data);
        return null;
    }
};

// API endpoint to add data
app.post('/api/addData', async (req, res) => {
    const { name, age } = req.body;
    console.log('Received data:', { name, age }); // Log the received data

    const data = await addAirtableData(name, age);
    if (data) {
        console.log('Data added to Airtable:', data); // Log the response from Airtable
        res.json({ success: true, data });
    } else {
        console.error('Failed to add data to Airtable');
        res.status(500).json({ success: false, message: 'Error adding data' });
    }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
