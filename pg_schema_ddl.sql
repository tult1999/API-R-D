-- Table to store information about customer orders
CREATE TABLE order_header (
    transaction_id VARCHAR(255) PRIMARY KEY,  -- Unique identifier for each transaction
    transaction_date TIMESTAMP WITHOUT TIME ZONE NOT NULL, -- Date and time of the transaction
    customer_id VARCHAR(255),  -- Identifier for the customer (can be NULL if unidentified)
    membership_type VARCHAR(50), -- Type of membership the customer has (if applicable)
    quantity_of_customers INTEGER CHECK (quantity_of_customers >= 0), -- Number of customers in the order
    gross_alc NUMERIC(12, 2) NOT NULL CHECK (gross_alc >= 0) DEFAULT 0, -- Gross sales from alcoholic beverages
    gross_buffet NUMERIC(12, 2) NOT NULL CHECK (gross_buffet >= 0) DEFAULT 0, -- Gross sales from buffet
    gross_combo NUMERIC(12, 2) NOT NULL CHECK (gross_combo >= 0) DEFAULT 0, -- Gross sales from combo meals
    gross_amount NUMERIC(12, 2) GENERATED ALWAYS AS (gross_alc + gross_buffet + gross_combo) STORED, -- Total gross sales amount (calculated)
    vat NUMERIC(12, 2) NOT NULL CHECK (vat >= 0), -- Value-added tax amount
    net_amount NUMERIC(12, 2) GENERATED ALWAYS AS (gross_alc + gross_buffet + gross_combo + vat) STORED, -- Net amount after adding VAT (calculated)
    discount NUMERIC(12, 2) NOT NULL CHECK (discount >= 0) DEFAULT 0, -- Discount applied to the order
    revenue NUMERIC(12, 2) GENERATED ALWAYS AS (gross_alc + gross_buffet + gross_combo + vat - discount) STORED, -- Final revenue after discount (calculated)
    used_loyalty_app_evoucher BOOLEAN,  -- Indicates if a loyalty app e-voucher was used
    used_brand_voucher BOOLEAN, -- Indicates if a brand voucher was used
    used_loyalty_app_point_voucher BOOLEAN, -- Indicates if loyalty app points were used as a voucher
    used_unidentified_voucher BOOLEAN, -- Indicates if an unidentified voucher was used
    restaurant_id VARCHAR(255) NOT NULL, -- Identifier for the restaurant where the order was placed
    sale_channel VARCHAR(50) NOT NULL -- Channel through which the sale was made (e.g., online, in-store)
);

-- Table to store customer information
CREATE TABLE customers (
    customer_id VARCHAR(255) PRIMARY KEY, -- Unique identifier for each customer
    membership_type VARCHAR(50) NOT NULL, -- Type of membership the customer has
    date_created DATE NOT NULL, -- Date when the customer record was created
    gender VARCHAR(10), -- Gender of the customer
    age INTEGER CHECK (age IS NULL), -- Age of the customer (optional, with reasonable range check)
    group_age VARCHAR(10) -- Age group the customer belongs to
);

-- Table to store information about restaurants
CREATE TABLE restaurants (
    restaurant_id VARCHAR(255) PRIMARY KEY, -- Unique identifier for each restaurant
    restaurant_province VARCHAR(100), -- Province where the restaurant is located
    restaurant_region VARCHAR(100), -- Region where the restaurant is located
    brand VARCHAR(100), -- Brand name of the restaurant
    restaurant_district VARCHAR(100), -- District where the restaurant is located
    brand_type VARCHAR(50) -- Type of brand (e.g., franchise, independent)
);

-- Table to store reservation information
CREATE TABLE reservations (
    booking_id VARCHAR(255) PRIMARY KEY, -- Unique identifier for each reservation
    booking_status VARCHAR(50) NOT NULL, -- Status of the reservation (e.g., confirmed, cancelled)
    booking_date TIMESTAMP WITHOUT TIME ZONE, -- Date and time of the reservation
    booking_source VARCHAR(100) NOT NULL, -- Source of the reservation (e.g., website, phone)
    booker_phone_number VARCHAR(20), -- Phone number of the person who made the reservation
    booker_email VARCHAR(255), -- Email of the person who made the reservation
    concept VARCHAR(100), -- Concept or theme of the reservation (if applicable)
    group_size BIGINT, -- Number of people in the reservation group
    children INTEGER, -- Number of children in the reservation group
    restaurant_id VARCHAR(255) NOT NULL -- Identifier for the restaurant where the reservation is made
);



-- Index on transaction date for faster queries based on date
CREATE INDEX idx_order_header_transaction_date ON order_header(transaction_date);
-- Index on restaurant ID for efficient joins with the 'restaurants' table
CREATE INDEX idx_order_header_restaurant_id ON order_header(restaurant_id);

-- Index on date created for faster queries based on customer creation date
CREATE INDEX idx_customers_date_created ON customers(date_created);

-- Index on booking date for faster queries based on reservation date
CREATE INDEX idx_reservations_booking_date ON reservations (booking_date);
-- Index on restaurant ID for efficient joins with the 'restaurants' table
CREATE INDEX idx_reservations_restaurant_id ON reservations (restaurant_id);



-- Add foreign key
ALTER TABLE order_header ADD CONSTRAINT fk_restaurants FOREIGN KEY (restaurant_id) REFERENCES restaurants (restaurant_id);

-- Add foreign key
ALTER TABLE reservations ADD CONSTRAINT fk_restaurants FOREIGN KEY (restaurant_id) REFERENCES restaurants (restaurant_id);