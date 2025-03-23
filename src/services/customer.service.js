const Customer = require('./../models/customer.modelv2'); // Assuming you have a customer.model.js

class CustomerService {
  async createCustomer(customerData) {
    try {
      return await Customer.create(customerData);
    } catch (error) {
      console.error('Error creating customer:', error);
      throw error; // Re-throw the error for handling in the controller
    }
  }

  async getCustomerById(customerId) {
    try {
      return await Customer.findById(customerId);
    } catch (error) {
      console.error('Error getting customer by ID:', error);
      throw error;
    }
  }

  async getAllCustomers() {
    try {
      return await Customer.findAll();
    } catch (error) {
      console.error('Error getting all customers:', error);
      throw error;
    }
  }

  async updateCustomer(customerId, updateData) {
    try {
      return await Customer.findByIdAndUpdate(customerId, updateData, {
        new: true, // Return the updated document
        runValidators: true, // Ensure schema validation
      });
    } catch (error) {
      console.error('Error updating customer:', error);
      throw error;
    }
  }

  async deleteCustomer(customerId) {
    try {
      return await Customer.findByIdAndDelete(customerId);
    } catch (error) {
      console.error('Error deleting customer:', error);
      throw error;
    }
  }

  async findCustomersByQuery(query) {
    try {
      return await Customer.find(query);
    } catch (error) {
      console.error('Error finding customers by query:', error);
      throw error;
    }
  }

  // Add more customer-related business logic here
}

module.exports = new CustomerService();