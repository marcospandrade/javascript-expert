import { readFileSync, writeFileSync } from 'fs';
import { writeFile, readFile, open } from 'fs/promises'
import path from 'path';

export const save = async (data) => {
    // const { pathname: databaseFile } = new URL('./../database.json', import.meta.url);
    const databaseFile = path.basename("../database.json");
    const currentData = JSON.parse(await readFile(databaseFile));

    // const rawData = readFileSync(databaseFile)
    // console.log('rawData', rawData)
    // const currentData = JSON.parse(rawData)
    currentData.push(data)
    await writeFile(databaseFile, JSON.stringify(currentData))
}