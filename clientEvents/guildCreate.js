module.exports = async(client, guild) =>{
        const newGuild = {
            guildID: guild.id,
            guildName: guild.name,
        };
    
        try {
            await client.createGuild(newGuild);
        } catch (error) {
            console.error(error);
        }

    
}