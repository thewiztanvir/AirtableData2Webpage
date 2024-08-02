# Real-time Airtable Data Project

## Setup Instructions

### Step 1: Initialize a New Node.js Project

If you haven't already initialized a new Node.js project, you can do so with:

```bash
npm init -y
```


### Step 2: Install Required Packages
Install the following packages:

express: A minimal and flexible Node.js web application framework.
axios: Promise-based HTTP client for the browser and Node.js.
dotenv: A zero-dependency module that loads environment variables from a .env file into process.env.
ws: A simple to use, blazing fast, and thoroughly tested WebSocket client and server for Node.js.
Here are the commands to install these packages:

```bash
npm install express axios dotenv ws

```

### Step 3: Install body-parser (Optional)
If using an older version of Express, you might need body-parser. For Express 4.16.0 and higher, you can use express.json() and express.urlencoded() instead.

```bash
npm install body-parser

```
##Summary of Commands

```bash
npm init -y
npm install express axios dotenv ws
# npm install body-parser # (Optional, if using an older version of Express)

```

##Verify .env File
Ensure you have a .env file with the following entries:

AIRTABLE_BASE_ID=your_base_id
AIRTABLE_TABLE_NAME=your_primary_table_name
AIRTABLE_NEW_TABLE_NAME=your_new_table_name
AIRTABLE_PAT=your_personal_access_token

###Running the Server
After installing the packages and setting up the .env file, you can start your server with:

```bash
node server.js

```

Ensure that server.js is the filename of your server code. If it's named differently, replace server.js with your actual filename.

