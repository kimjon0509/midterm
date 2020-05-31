-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  profile_photo VARCHAR(255),
  email VARCHAR(255) NOT NULL,
  password VARCHAR (255) NOT NULL,
  phone_number VARCHAR(255),
  location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE
);
