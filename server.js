const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const userController = require('./controllers/userController');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.post('/api/users', userController.createUser);
app.get('/api/users', userController.showUser);

// Start the server
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
