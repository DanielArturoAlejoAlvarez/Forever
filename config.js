module.exports={
    port: process.env.PORT || 3000,
    db: process.env.MONGODB || 'contactlist',
    collection1: process.env.TABLE1 || 'contactlist'
}