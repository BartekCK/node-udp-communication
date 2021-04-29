const fs = require('fs').promises;

const fileService = {
    createFile: async (fileName) => {
        const file = await fs.open(fileName, 'w');
        await file.close();
        console.log('1. Action for file create');
    },

    writeToFile: async (fileName, content) => {
        await fs.appendFile(fileName, content);
        console.log('2. Action for file update');
    },

    deleteFile: async (fileName) => {
        await fs.unlink(fileName);
        console.log('3. Action for file delete');
    },
};

module.exports = fileService;
