const EventEmitter = require('events').EventEmitter;
const CommandLine = require('./readline');

class MyEmitter extends EventEmitter {}

class Cli {

    constructor(options) {
        this.options = options || {};
        this.emmiter = new MyEmitter;
        this.queue = [];
        this.commands = [];
        this.commands_info = {};
        this.invoke();
    }

    emitting = () => {
        for(let i = 0; i < 11; i++) {
            this.emmiter.emit('cmds');
        }
    }

    // returns readline value
    get_context = async() => {
        const line = await CommandLine.invoke();

        return line;
    }

    // invokes listen to readline
    invoke = async() => {
        const line = await CommandLine.invoke();

        if(this.options.auto_clear) {
            this.clear();
        }

        let cmd_arr = line.split(' ');

        const cmd = cmd_arr[0];
        
        if(this.commands.includes(cmd)) {

            const { args, flags } = this.commands_info[cmd];

            cmd_arr.shift();

            const t_args = [], t_flags = [];

            if(cmd_arr) {

                cmd_arr.map((item) => {
                    if(flags && flags.includes(item)) {
                        return t_flags[t_flags.length] = item;
                    }

                    if(args && t_args.length < args.length) {
                        t_args[t_args.length] = item;
                    }
                });
            }

            this.queue.push(cmd);

            return this.emmiter.emit(cmd, t_args, t_flags);
        }

        if(this.notExistCallback != null) { 
            this.notExistCallback(cmd);
        }

        return this.invoke();
    }

    // set description for commands
    set_info = (object) => {
        for(let i in object) {
            try {
                this.commands_info[i].description = object[i];
            } catch(e) {
                console.error("Command was not found. You can`t add description to not existant command");
            }
        }
    }

    // clears console
    clear = () => {
        process.stdout.write("\u001b[3J\u001b[2J\u001b[1J");
        console.clear();
    }

    // error handler of non existent command
    nonExist = (callback) => {
        this.notExistCallback = callback;
    }

    // optional function for next invoke function
    next = () => {
        this.queue = [];
        this.invoke();
    }

    // returns everything about commands
    get_all_commands = () => {
        return this.commands_info;
    }

    // signs handlers
    on = (cmd, arg, callback) => {

        if(this.commands.includes(cmd)) return console.error(`Command [${cmd}] already exists!`);

        const flags = [];

        const args = [];

        if(arg) {
            arg = arg.split(' ').join('').split(';');

            arg.map((item) => {

                if(item.startsWith('--')) {
                    return flags[flags.length] = item;
                }

                if(item.startsWith('[') && item.endsWith(']')) {
                    item = JSON.parse(item);

                    item.map((item) => {
                        args[args.length] = item;
                    });
                }

                return;
            });
        }

        this.commands[this.commands.length] = cmd;
        this.commands_info[cmd] = { args, flags };

        this.emmiter.on(cmd, async(args, flags) => {
            if(!this.options.skip) {
                await callback({ args: args, flags: flags });
                return this.next();
            }
            return callback({ args: args, flags: flags }, this.next);
        })
    }
}

module.exports = Cli;