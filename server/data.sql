
CREATE TABLE users (
    id SERIAL PRIMARY KEY NOT NULL ,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    avartar_image VARCHAR(255),
    UNIQUE(user_email)
);

ALTER TABLE users ADD COLUMN avatar_image VARCHAR(255);

INSERT INTO users (id, user_email, user_password, first_name, last_name) VALUES(DEFAULT,'kayla@gmail.com','1','Kayla','G');

DROP TABLE users;

CREATE TABLE sessions (
  sid VARCHAR PRIMARY KEY NOT NULL,
  sess JSON NOT NULL,
  expire TIMESTAMP(6) NOT NULL
);