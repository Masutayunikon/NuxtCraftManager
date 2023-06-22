CREATE TABLE servers (
                         id SERIAL,
                         server_id INTEGER NOT NULL,
                         name VARCHAR(255) NOT NULL,
                         memory_min INTEGER,
                         memory_max INTEGER,
                         state VARCHAR(20),
                         user_id INTEGER REFERENCES users(id),
                         PRIMARY KEY (id, server_id)
);
