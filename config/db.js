const mongose = require('mongoose');
mongose
    .connect('mongodb+srv://'+ process.env.DB_USER_PASS+'@finales.xzbm4.mongodb.net/myProjet',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false

        })
    .then(() => console.log("connectd to mongoDb"))
    .catch((err) => console.log("Faild to connect to mongodb", err));