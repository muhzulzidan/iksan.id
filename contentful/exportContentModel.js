const contentful = require('contentful-management');
const fs = require('fs');

// Define the source space ID and management token
const sourceSpaceId = '1612ijcm5jnx';
const sourceManagementToken = 'SO9nSrTttrnw1dnu-lrCTxMetZnlwckVgllimbimZi8';
const exportFile = 'content-model.json';

// Initialize the Contentful Management Client
const client = contentful.createClient({
    accessToken: sourceManagementToken
});

// Function to export content model
async function exportContentModel() {
    try {
        const space = await client.getSpace(sourceSpaceId);
        const environment = await space.getEnvironment('master');

        // Fetch content types
        const contentTypes = await environment.getContentTypes();

        // Write the content types to a JSON file
        fs.writeFileSync(exportFile, JSON.stringify(contentTypes.items, null, 2), 'utf8');
        console.log(`Content model written to ${exportFile}`);
    } catch (error) {
        console.error(`Error exporting content model: ${error.message}`);
    }
}

// Execute the export function
exportContentModel();