const fs = require('fs').promises;

const fileService = {
    createFile: async (fileName) => {
        const file = await fs.open(fileName, "w");
        await file.close();
    },

    writeToFile: async (fileName, content) => {
        await fs.appendFile(fileName, content);
    },

    deleteFile: async (fileName) => {
        await fs.unlink(fileName);
    }
}

module.exports = fileService;
