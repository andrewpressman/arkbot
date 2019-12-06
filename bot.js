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
            case '8ball':
                    const responses = [
                        "It is certain",
                        "It is decidedly so",
                        "Without a doubt",
                        "Yes – definitely",
                        "You may rely on it",
                        "As I see it",
                        "yes",
                        "Most Likely",
                        "Outlook good",
                        "Yes",
                        "Signs point to yes"
                    ];

                    const randomIndex = Math.floor(Math.random() * responses.length);

                    var ball;
                    if(args.length > 1)
                    {
                        ball = args[0];
                        for(i = 1; i < args.length; i++)
                        {
                            ball = ball + " " + args[i];
                        }
                        bot.sendMessage({
                            to: channelID,
                            message:"8ball says: " + responses[randomIndex] + " to: " + ball,
                        });
                    }
                    else if(args.length == 1)
                    {
                        ball = args[0];
                        bot.sendMessage({
                            to: channelID,
                            message:"8ball says: " + responses[randomIndex] + " to: " + ball,
                        });
                    }
                    else
                    {
                        bot.sendMessage({
                            to: channelID,
                            message:"8ball says: you need to add something after !8ball",
                        });
                    }
                    ball = true;
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
            case 'GetPizza':
                    switch(Math.round(Math.random() * 3))
                    {
                        case 0:
                            pizza = 'https://upload.wikimedia.org/wikipedia/commons/b/ba/New_York-Style_Pizza.png';
                            break;
                        case 1:
                            pizza = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Pizza_quattro_formaggi_at_restaurant%2C_Chalk_Farm_Road%2C_London.jpg/440px-Pizza_quattro_formaggi_at_restaurant%2C_Chalk_Farm_Road%2C_London.jpg';
                            break;
                        case 2:
                            pizza = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Greek_pizza_%281%29.jpg/440px-Greek_pizza_%281%29.jpg';
                            break;
                    }
                    bot.sendMessage({
                        to: channelID,
                        message: 'Here is a pizza\n' + pizza, 
                    });
                break;
            case 'swaglevel':
                    bot.sendMessage({
                        to: channelID,
                        message: user + ' has ' + Math.round(Math.random() * 100) + " swag", 
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
                    "\n !swaglevl: tells user how much swag they have" +
                    "\n !GetPizza: gets the user a picture of a pizza" +
                    "\n !8ball <input>: Magic 8 ball, ask it a question!" +
                    "\n !help: lists all commmands"
                });        
            break;              
         }
     }
})