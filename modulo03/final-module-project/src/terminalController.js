import DrafLog from 'draftlog';
import chalk from 'chalk/index.js';
import chalkTable from 'chalk-table';
import readline from 'readline'
import Person from './person.js'

export default class TerminalController {
    constructor(){
        this.print = {}
        this.data = {}
        this.terminal = {}
    }

    initializeTerminal(database, language){
        DrafLog(console).addLineListener(process.stdin);
        this.terminal = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        this.initializeTable(database, language)
    }

    updateTable(item) {
        this.data.push(item);
        this.print(chalkTable(this.getTableOptions(), this.data))
    }

    initializeTable(database, language){
        const data = database.map(item => new Person(item).formatted(language))
        const table = chalkTable(this.getTableOptions(), data );

        this.print = console.draft(table)
        this.data = data
    }

    question(msg = ''){
        return new Promise(resolve => this.terminal.question(msg, resolve))
    }

    closeTerminal(){
        this.terminal.close()
    }

    getTableOptions() {
        return {
            leftPad: 2,
            columns: [
                { field: 'id', name: chalk.cyan("ID") },
                { field: 'vehicles', name: chalk.magenta("Vehicles") },
                { field: 'kmTraveled', name: chalk.cyan("Km Traveled") },
                { field: 'from', name: chalk.cyan("From") },
                { field: 'to', name: chalk.cyan("To") }
            ]
        }
    }
}