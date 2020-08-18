# sk-cli

sk-cli is a library for creation cli applications.

## Usage

### Example #1

You can see very simple example of using sk-cli:

```javascript
const cli = require('../index');

const app = new cli();

app.on('happy', null, () => {
    console.log(':)');
});

app.nonExist(() => {
    console.log(':(');
})
```

### Example #2

You can use args and flags in your cli-application.

e.g

```javascript
app.on('login', '["username", "password"]', (args) => {
    console.log(args);
})
```

An example input like a:

```javascript
login admin 12345

// outputs: { args: [ 'admin', '12345' ], flags: [] }
```

## cli(options)

* **options**
    * `skip` - cli application can wait your action to invoke **next()** function
    * `auto_clear` - clears everything after entered smth in console

```javascript
const cli = require('../index');

const app = new cli();

app.on('demo', null, (res, next) => {
    console.log(':)');

    return next(); // waiting until function next() was not invoked
});
```

## on(cmd, args/flags, callback)

|**name**|**type**|**desc**|
|:---|:---|:---|
|cmd|**string**|listen to current command|
|args/flags|**string**|You can set flags and arguments|
|callback|**function**|Set function to current command|

```javascript
app.on('happy', '--dev;--test;--selflag;["self","test","demo"]', () => {
    console.log('You are here :)')
});
```

## nonExist(callback)

You can handle non-existant commands to outputs message

|**name**|**type**|**desc**|
|:---|:---|:---|
|callback|**function**| Custom function to handle non-existant command|

```javascript
app.nonExist(() => {
    console.log(':(');
});
```

## get_context()

returns input in function

```javascript
app.on('demo', null, () => {

    let str = app.get_context();

    console.log(str);
});
```

## clear()

To clear the screen or console

```javascript
app.on('clear', null, () => {
    app.clear();

    console.log('Hello world');
});
```

## get_all_commands()

returns info about all commands

## set_info(object)

sets description to current command

```javascript
app.on('cmds', null, () => {
    let info = app.get_all_commands();

    console.log(info);
});

app.set_info({ 'cmds': 'outputs info about commands' });

// { cmds: { args: [], flags: [], description: 'outputs info about commands' }}
```

# Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

# License
[MIT](https://github.com/Bennibrovold/cli/blob/master/LICENSE)