const express = require('express');
const router = express.Router();
const customerController = require('./../controllers/customer.controller');

// Create a new customer
router.post('/createCustomer', customerController.createCustomer);

// Get all customers
router.get('/getAllCustomers', customerController.getAllCustomers);

// Get a customer by ID
router.get('/:id', customerController.getCustomerById);

// Update a customer by ID
router.put('/:id', customerController.updateCustomer);

// Delete a customer by ID
router.delete('/:id', customerController.deleteCustomer);

// Find customers by query parameters (e.g., /customers/search?name=John&city=New York)
router.get('/search', customerController.findCustomersByQuery);

module.exports = router;