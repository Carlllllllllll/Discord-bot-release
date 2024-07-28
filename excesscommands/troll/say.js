const Filter = require('bad-words');
const filter = new Filter();

module.exports = {
    name: 'say',
    description: 'Deletes your message and says something.',
    async execute(message, args) {
     
        if (!args.length) {
            return message.reply('You need to provide some text to say!');
        }


        let text = args.join(' ');

   
        text = text
            .replace(/@everyone/g, '[everyone]')
            .replace(/@here/g, '[here]')
            .replace(/<@&\d+>/g, '[role]')
            .replace(/<@!\d+>/g, '[user]')
            .replace(/<#\d+>/g, '[channel]')
            .replace(/https?:\/\/\S+/g, '[link]');

   
        text = filter.clean(text);


        try {
            await message.delete();
        } catch (error) {
            console.error('Error deleting message:', error);
            return message.reply('There was an error deleting your message.');
        }

        // Send the new message
        message.channel.send(text);
    },
};
