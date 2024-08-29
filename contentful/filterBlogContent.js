const fs = require('fs');

// Define the input and output file paths
const inputFile = 'blog-space-export.json';
const outputFile = 'filtered-blog-space-export.json';

// Read the exported JSON file
fs.readFile(inputFile, 'utf8', (err, data) => {
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
    fs.writeFile(outputFile, JSON.stringify(filteredJsonData, null, 2), 'utf8', (err) => {
        if (err) {
            console.error(`Error writing file: ${err.message}`);
            return;
        }
        console.log(`Filtered content written to ${outputFile}`);
    });
});