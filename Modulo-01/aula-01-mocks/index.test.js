const { error} = require("./src/constants");
const File = require("./src/file");
const assert = require('assert');


;(async () => {
    {
        const filePath = "./mocks/emptyFile-invalid.csv";
        const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await assert.rejects(result, expected)
    }

    {
        const filePath = "./mocks/invalid-header.csv";
        const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await assert.rejects(result, expected)
    }

    {
        const filePath = "./mocks/fiveItems-invalid.csv";
        const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
        const result = File.csvToJson(filePath)
        await assert.rejects(result, expected)
    }

    {
        const filePath = "./mocks/threeItems-valid.csv";
        const expected =[
            {
                id: 1,
                name: "John",
                profession: "JavascriptDeveloper",
                age: 25
            },
            {
                id: 2,
                name: "Snow",
                profession: "developer",
                age: 29
            },
            {
                id: 3,
                name: "Zé",
                profession: "manager",
                age: 22
            }
        ]
        const result = await File.csvToJson(filePath)
        assert.deepEqual(result, expected)
    }
})()