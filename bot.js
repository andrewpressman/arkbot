var Discord = require('discord.io');
var logger = require('winston');
var auth = require('C:/Users/spyan/Documents/Discord Bot/auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'pong'
                });
            break;
            case 'echo':
                    var echo;
                    if(args.length > 1)
                    {
                        echo = args[0];
                        for(i = 1; i < args.length; i++)
                        {
                            echo = echo + " " + args[i];
                        }
                    }
                    else if(args.length == 1)
                    {
                        echo = args[0];
                    }
                    else
                    {
                        echo = "nothing"
                    }
                    bot.sendMessage({
                        to: channelID,
                        message: 'You said: ' + echo,
                    });
                    echo = true;
                break;
            case 'obeyme':
                    logger.info(user + ' used obeyme');
                    // send message to chat
                    bot.sendMessage({
                        to: channelID,
                        message: 'fine...grrr ' + user,
                    });
                    break;
            case 'koala':
                bot.sendMessage({
                    to: channelID,
                    message: 'This is a koala!\n' + 'https://upload.wikimedia.org/wikipedia/commons/4/49/Koala_climbing_tree.jpg', 
                });
            break;
            case 'help':
                bot.sendMessage({
                    to: channelID,
                    message: 'here are all the current available commands: ' + 
                    "\n !ping: responds Pong!" +
                    "\n !obeyme: the bot will obey" +
                    "\n !echo <input> : the bot will repeat what it was told to echo" +
                    "\n !koala: give a picture of a koala" +
                    "\n !help: lists all commmands"
                });        
            break;                
         }
     }
})