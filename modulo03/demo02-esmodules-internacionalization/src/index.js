import database from '../database.json'
import Person from './person.js';
import TerminalController from './terminalController.js';

const DEFAULT_LANG = "pt-BR"
const STOP_TERM = ":q"
// 2 aviao,bike 200000 2020-02-20 2021-02-20
const terminalController = new TerminalController();
terminalController.initializeTerminal(database, DEFAULT_LANG);

async function mainLoop(){
    try {
        const answer = await terminalController.question()
        console.log('answer', answer);
        if(answer === STOP_TERM){
            terminalController.closeTerminal()
            console.log('process finished ')
            return;
        }
        const person = Person.generateInstaceFromString(answer)
        console.log('new person', person.formatted(DEFAULT_LANG))
        return mainLoop()
    } catch (err){
        console.log("Deu ruim", err)
        return mainLoop()
    }
}

await mainLoop()