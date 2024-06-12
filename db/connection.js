const M=require('mongoose')
M.connect('mongodb+srv://gayatriji002:AQIqMBlZzEEJeho1@cluster0.kkee6ul.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
.then( ()=>{
    console.log("server is connected to database")
})
.catch( ()=>{
    console.log("database is not connected")
})
