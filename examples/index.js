const cli = require('../index');

const app = new cli();

app.on('cmds', null, () => {
    let info = app.get_all_commands();

    console.log(info);
});

app.nonExist(() => {
    console.log('no exists');
})

app.set_info({ 'cmds': 'outputs info about commands' });
