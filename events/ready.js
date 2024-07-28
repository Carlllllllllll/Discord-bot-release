const { ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,
    execute(client) {

        const activities = [
            { name: '📺 Netflix', type: ActivityType.Watching },
            { name: '🎮 GTA VI', type: ActivityType.Playing },
            { name: '📹 on YouTube', type: ActivityType.Streaming },
            { name: '🎵 Spotify', type: ActivityType.Listening },
            { name: '🖥️ coding', type: ActivityType.Playing },
            { name: '📖 reading a book', type: ActivityType.Reading },
            { name: '🍽️ cooking', type: ActivityType.Watching },
            { name: '🚶 walking', type: ActivityType.Competing },
            { name: '💤 sleeping', type: ActivityType.Watching },
            { name: '🎬 watching movies', type: ActivityType.Watching },
            { name: '🎧 listening to podcasts', type: ActivityType.Listening },
            { name: '🏋️ working out', type: ActivityType.Competing },
            { name: '🧘 meditating', type: ActivityType.Watching },
            { name: '🚴 cycling', type: ActivityType.Competing },
            { name: '🏞️ hiking', type: ActivityType.Competing },
            { name: '🎨 drawing', type: ActivityType.Playing },
            { name: '🎲 playing board games', type: ActivityType.Playing },
            { name: '🛌 relaxing', type: ActivityType.Watching },
            { name: '📝 writing', type: ActivityType.Playing },
            { name: '📚 studying', type: ActivityType.Reading },
            { name: '🌍 exploring', type: ActivityType.Playing },
        ];

        const statuses = ['online', 'idle', 'dnd'];

        let currentActivityIndex = 0;
        let currentStatusIndex = 0;

        function setActivityAndStatus() {
            // Add dynamic activity with server and user count
            const serverCount = client.guilds.cache.size;
            const userCount = client.users.cache.size;
            const dynamicActivity = { name: `serving ${serverCount} servers and ${userCount} users`, type: ActivityType.Watching };

            const activity = currentActivityIndex === activities.length ? dynamicActivity : activities[currentActivityIndex];
            const status = statuses[currentStatusIndex];

            client.user.setPresence({
                activities: [activity],
                status: status,
            });

            currentActivityIndex = (currentActivityIndex + 1) % (activities.length + 1); // +1 for dynamicActivity
            currentStatusIndex = (currentStatusIndex + 1) % statuses.length;
        }

        setTimeout(() => {
            setActivityAndStatus();
            console.log('\x1b[31m[ CORE ]\x1b[0m \x1b[32m%s\x1b[0m', 'Bot Activity Set Successfully ✅');
        }, 2000);

        setInterval(() => {
            setActivityAndStatus();
        }, 6000);
    },
};
