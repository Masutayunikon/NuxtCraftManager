CREATE TABLE tokens (
                        id SERIAL PRIMARY KEY,
                        token_value VARCHAR(255) NOT NULL,
                        expiration_date TIMESTAMP NOT NULL,
                        user_id INTEGER REFERENCES users(id)
);
