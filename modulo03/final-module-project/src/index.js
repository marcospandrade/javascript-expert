import database from '../database.json'
import Person from './person.js';
import { save } from './repository.js';
import TerminalController from './terminalController.js';

const DEFAULT_LANG = "pt-BR"
const STOP_TERM = ":q"

const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANG);

// EXAMPLE INPUT: 2 aviao,bike 200000 2020-02-20 2021-02-20

async function mainLoop(){
    try {
        const answer = await terminalController.question()
        if(answer === STOP_TERM){
            terminalController.closeTerminal()
            console.log('process finished ')
            return;
        }
        const person = Person.generateInstaceFromString(answer)
        terminalController.updateTable(person.formatted(DEFAULT_LANG))
        await save(person)
        
        return mainLoop()
    } catch (err){
        console.log("Deu ruim", err)
        return mainLoop()
    }
}

await mainLoop()