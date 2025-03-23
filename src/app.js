const express = require('express');
const customerRoutes = require('./routes/customer.route');
const app = express();
const PORT = 3000;
const { pool } = require('./config/database')

// Middleware
app.use(express.json()); // Parse JSON request bodies

// Attach the pool to the app object for use in routes/controllers
try{
  app.set('dbPool', pool);
}catch(err){
  console.log(err);
}


// Routes
app.use('/customers', customerRoutes);

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Welcome to the Customer API (PostgreSQL)');
});

// Error handling middleware (example)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
    console.log('Closing PostgreSQL pool...');
    await pool.end();
    console.log('PostgreSQL pool closed.');
    process.exit(0);
});