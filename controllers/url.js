// Import the nanoid library for generating unique IDs
const shortid = require('shortid');

// Import the URL model defined earlier for database interactions
const URL = require('../models/url');

// Define an asynchronous function to handle generating new short URLs
async function handleGenerateNewShortURL(req, res) {
    // Extract the request body containing the URL to shorten
    const body = req.body;

    // Validate if the URL is provided in the request body
    if (!body.url) return res.status(400).json({ error: 'url is required' });

    // Generate a unique 8-character short ID using nanoid
    const shortID = shortid();

    // Create a new document in the URL collection with the short ID and original URL
    await URL.create({
        shortId: shortID, // Unique short ID
        redirectURL: body.url, // Original URL
        visitHistory: [], // Initialize visit history as an empty array
    });

    return res.render("home",{
        id:shortID,
    })
}
async function handleGetAnalytics(req, res){
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId})
    return res.json({totalClicks: result.visitHistory.length, analytics: result.visitHistory})
}


// Export the handleGenerateNewShortURL function for use in other files
module.exports = { handleGenerateNewShortURL, handleGetAnalytics };