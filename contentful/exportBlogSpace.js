// Import the required modules
const { exec } = require('child_process');
const fs = require('fs');

// Define the space ID and management token
const spaceId = '1612ijcm5jnx';
const managementToken = 'i5VkFyWhu1n4yd_Ygiw_jpOe0C9-oI4cLO4r4Arutrc';
const exportFile = 'blog-space-export.json';
const filteredExportFile = 'filtered-blog-space-export.json';

// Construct the Contentful CLI command
const command = `contentful space export --space-id ${spaceId} --management-token ${managementToken} --export-dir ./ --content-file ${exportFile}`;

// Execute the command
exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
    }
    console.log(`Stdout: ${stdout}`);

    // Read the exported JSON file
    fs.readFile(exportFile, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file: ${err.message}`);
            return;
        }

        // Parse the JSON data
        const jsonData = JSON.parse(data);

        // Filter the content to include only the "blog" content type
        const filteredContentTypes = jsonData.contentTypes.filter(contentType => contentType.sys.id === 'blog');
        const filteredEntries = jsonData.entries.filter(entry => entry.sys.contentType.sys.id === 'blog');

        // Create the filtered JSON object
        const filteredJsonData = {
            ...jsonData,
            contentTypes: filteredContentTypes,
            entries: filteredEntries
        };

        // Write the filtered JSON data to a new file
        fs.writeFile(filteredExportFile, JSON.stringify(filteredJsonData, null, 2), 'utf8', (err) => {
            if (err) {
                console.error(`Error writing file: ${err.message}`);
                return;
            }
            console.log(`Filtered content written to ${filteredExportFile}`);
        });
    });
});