const fs = require('fs').promises;

const fileService = {
    createFile: async (fileName) => {
        try {
            const file = await fs.open(fileName, 'w');
            await file.close();
            console.log('1. Action for file create');
        } catch (e) {
            console.log('1. Error when file create');
        }
    },

    writeToFile: async (fileName, content) => {
        try {
            await fs.appendFile(fileName, content);
            console.log('2. Action for file update');
        } catch (e) {
            console.log('2. Error when file update');
        }
    },

    deleteFile: async (fileName) => {
        try {
            await fs.unlink(fileName);
            console.log('3. Action for file delete');
        } catch (e) {
            console.log('3. Error when file delete');
        }
    },
};

module.exports = fileService;
