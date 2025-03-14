const customerService = require('./../services/customer.service');

async function createCustomer(req, res) {
  try {
    const newCustomer = await customerService.createCustomer(req.body);
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getCustomerById(req, res) {
  try {
    const customer = await customerService.getCustomerById(req.params.id);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(customer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllCustomers(req, res) {
  try {
    const customers = await customerService.getAllCustomers();
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateCustomer(req, res) {
  try {
    const updatedCustomer = await customerService.updateCustomer(req.params.id, req.body);
    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteCustomer(req, res) {
  try {
    const deletedCustomer = await customerService.deleteCustomer(req.params.id);
    if (!deletedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }
    res.status(204).send(); // No content on successful deletion
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function findCustomersByQuery(req, res) {
  try {
    const customers = await customerService.findCustomersByQuery(req.query);
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createCustomer,
  getCustomerById,
  getAllCustomers,
  updateCustomer,
  deleteCustomer,
  findCustomersByQuery
};