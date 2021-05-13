const mongose = require('mongoose');
mongose
    .connect('mongodb://127.0.0.1:27017/CRM',
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false

        })
    .then(() => console.log("connectd to mongoDb"))
    .catch((err) => console.log("Faild to connect to mongodb", err));