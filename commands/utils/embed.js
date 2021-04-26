const Discord = require('discord.js');

module.exports = {
    name: 'event',
    description: 'ping pong',
    category: 'utils',
    run: async(client, message, args)=> {

        if(message.content.includes("--key")){
            var keyValue = message.content.split(" ")
            var data =  keyValue[keyValue.findIndex(el=>el.toLowerCase()==="--key")+1];
            console.log(data.split(/,\s+/));
        }
        if(message.content.includes("--content")){
            const contentValue = message.content.toLowerCase().split('--content')[1].split(',')[0].split(/,\s+/)
            console.log(contentValue)
        }
        if(message.content.includes("--delete")){
            const deleteKeyMsg = message.content.split(" ")
            const deleteKeyValue =  deleteKeyMsg[deleteKeyMsg.findIndex(el=>el.toLowerCase()==="--delete")+1];
            let deleteData = deleteKeyValue.replace(",", "")
            if(deleteData == "true"){
                console.log(deleteKeyValue.split(/,\s+/));
            }else if(deleteData == "false"){
                console.log(deleteKeyValue.split(/,\s+/));
            } 
        }
        if(message.content.includes("--embed")){
            const embedMsg = message.content.split(" ")
            const embedValue =  embedMsg[embedMsg.findIndex(el=>el.toLowerCase()==="--embed")+1];
            let embedData = embedValue.replace(",", "")
            if(embedData == "true"){
                console.log(embedValue.split(/,\s+/));
            }else if(embedData == "false"){
                console.log(embedValue.split(/,\s+/));
            } 
        }
        if(message.content.includes("--author")){
            const authorValue = message.content.toLowerCase().split('--author')[1].split(',')[0].split(/,\s+/)
            console.log(authorValue)
        }
        if(message.content.includes("--title")){
            const titleValue = message.content.toLowerCase().split('--title')[1].split(',')[0].split(/,\s+/)
            console.log(titleValue)
        }
        if(message.content.includes("--url")){
            const urlValue = message.content.toLowerCase().split('--url')[1].split(',')[0].split(/,\s+/)
            console.log(urlValue)
        }
        if(message.content.includes("--image")){
            const imageValue = message.content.toLowerCase().split('--image')[1].split(',')[0].split(/,\s+/)
            console.log(imageValue)
        }

        
    }
}