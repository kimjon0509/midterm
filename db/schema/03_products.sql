DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price INTEGER NOT NULL DEFAULT 0,
  condition TEXT,
  category TEXT,
  main_photo VARCHAR(255),
  sub_photo1 VARCHAR(255),
  sub_photo2 VARCHAR(255),
  sub_photo3 VARCHAR(255),
  sub_photo4 VARCHAR(255),
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  buyer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  location_id INTEGER REFERENCES locations(id) ON DELETE CASCADE
);
