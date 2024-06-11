const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const session = require('express-session');
const { processDeliveryReceipts } = require('./services/deliveryService');
const { connectRabbitMQ } = require('./config/rabbitMq');
const dotenv = require('dotenv');
const MongoStore = require('connect-mongo');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const audienceRoutes = require('./routes/audience');
const campaignRoutes = require('./routes/campaign');
const dataIngestionRoutes = require('./routes/dataIngestion.js');
const vendorRoutes = require('./routes/vendor');
const processData = require('./services/dataIngestionService.js');

dotenv.config();
require('./config/passport');

const app = express();

app.use(cors({ origin: 'https://mini-crm-1.onrender.com', credentials: true }));

app.use(express.json());
app.use(passport.initialize());
app.use(session({
    secret: Math.random().toString(36).substring(2),
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO }),
    cookie: { 
        maxAge: 1000 * 60 * 60 * 24,
        sameSite: 'none'
     }
}));
app.use(passport.session());


app.use('/auth', authRoutes);
app.use('/audience', audienceRoutes);
app.use('/campaign', campaignRoutes);
app.use('/data', dataIngestionRoutes);
app.use('/api/vendor', vendorRoutes);



async function startServer() {
    await mongoose.connect(process.env.MONGO).then(() => console.log('Connected to MongoDB')).catch(err => console.error('Error connecting to MongoDB:', err));
    await connectRabbitMQ().then(() => console.log('Connected to RabbitMQ')).catch(err => console.error('Error connecting to RabbitMQ:', err));
    processDeliveryReceipts();
    processData();
    app.listen(5000, () => console.log('Server started on port 5000'));
}

startServer();
