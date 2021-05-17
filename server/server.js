const express = require('express');

const userRoute=require('./routes/user.routes')
 const adminRoutes=require('./routes/admin/admineAuth.routes')
 const vehiculeRoutes=require('./routes/admin/vehicule.routes')

//  const commandeRoutes=require('./routes/admin/commande.routes')
//  const clientRoutes=require('./routes/admin/client.routes')

const bodyParser=require('body-parser')
const cookieParser=require('cookie-parser');


require('dotenv').config({path: './config/.env'});
require('./config/db');
const {checkUser,requireAuth} =require('./middleware/auth.middlware');
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//jwt
app.get('*',checkUser);
app.get('/jwtid',requireAuth,(req,res)=>{
    res.status(200).send(res.locals.user._id);
});

//route
app.use('/api/user',userRoute);
 app.use('/api/admin',adminRoutes);
 app.use('/api/admin/vehicule',vehiculeRoutes);

//  app.use('/api/admin/commande',commandeRoutes);
//  app.use('/api/admin/client',clientRoutes);

app.post('/api/uploads', (req, res) => {
    const { img } = req.body;
	res.sendFile(path.join(__dirname, `./uploads/${img}`));
});


//server
app.listen(process.env.PORT,()=>{
    console.log(`listen en port ${process.env.PORT}`);
});