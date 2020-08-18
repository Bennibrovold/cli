const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin
});

const invoke = () => {
    return new Promise((resolve, reject) => {
        rl.question('line', (input) => {
            resolve(input);
        });
    });

};

module.exports = {
    invoke
}