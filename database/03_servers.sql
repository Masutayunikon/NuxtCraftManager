CREATE TABLE servers (
                         id SERIAL,
                         server_id VARCHAR(255) NOT NULL,
                         name VARCHAR(255) NOT NULL,
                         type VARCHAR(50) NOT NULL,
                         category VARCHAR(50) NOT NULL,
                         version VARCHAR(50) NOT NULL,
                         memory_min INTEGER,
                         memory_max INTEGER,
                         state VARCHAR(20),
                         user_id INTEGER REFERENCES users(id),
                         PRIMARY KEY (id, server_id)
);
