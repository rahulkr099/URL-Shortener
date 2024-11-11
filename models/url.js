// Import the Mongoose library for MongoDB interactions
const mongoose = require("mongoose")

// Define a new Mongoose schema for storing URL data
const urlSchema = new mongoose.Schema(
    {
        // Unique identifier for the shortened URL
        shortId:{
            type: String, // Data type for shortId
            required: true, // Ensure shortId is always provided
            unique: true, // Prevent duplicate shortIds
        },
        // Original URL to redirect to
        redirectURL: {
            type: String, // Data type for redirectURL
            required: true, // Ensure redirectURL is always provided
        },
        // Record of visits with timestamps
        visitHistory: [{ 
            timestamp:{ 
                type: Number // Data type for visit timestamp
            }}]        
    },
    { 
        timestamps: true // Automatically add createdAt and updatedAt fields
    }
);

// Create a Mongoose model named "url" based on the urlSchema
const URL = mongoose.model("url", urlSchema);

// Export the URL model for use in other files
module.exports = URL;