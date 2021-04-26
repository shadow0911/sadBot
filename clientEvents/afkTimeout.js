const { Profiles } = require('../models')
module.exports = async client =>{
    
    const removeAFK = async () =>{
        const now = new Date()
        const conditional = {
            AFKTIME: {
                $lt: now
            }, 
            AFK: true
        }
        await Profiles.updateMany(conditional,{
            AFK: false
        })
        setTimeout(removeAFK, 10000)
    }
    removeAFK()
}