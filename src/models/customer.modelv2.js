const { pool } = require('../config/database')

const columnMapper = {
    customer_id : 'customer_id',
    membership_type : 'membership_type',
    date_created : 'date_created',
    gender : 'gender',
    age : 'age',
    group_age : 'group_age',
}

class Customers {
    constructor (customerData) {
        Object.keys(columnMapper).forEach(dbCol => {
            this[columnMapper[dbCol]] = columnMapper[dbCol];
        })
    }

    static async create(customerDataArray) {
        const columns = Object.keys(columnMapper);
        const values = customerDataArray.map(customerData => Object.values(customerData));
        // const placeholders = values.map((_, index) => `$${index + 1}`).join(', ');
        const placeholders = values.map((row, rowIndex) => {return `(${row.map((_, colIndex) => `$${rowIndex * columns.length + colIndex + 1}`).join(', ')})`;}).join(', ');
        const columnName = columns.join(', ');
        const flatValues = values.flat();
        
        try {
            const result = await pool.query(`INSERT INTO customers (${columnName}) VALUES ${placeholders} RETURNING *`, flatValues);
            return result.rows
        } catch (error) {
            console.error('Error creating customer: ', error)
            throw error;
        }
    }

    static async findAll() {
        try {
            const result = await pool.query('SELECT * FROM customers');
            return result.rows
        } catch (error) {
            console.error('Error finding all customers: ', error);
            throw error;
        }
    }
}

module.exports = Customers;