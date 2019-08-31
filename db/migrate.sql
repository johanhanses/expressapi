-- Reports, users table and dummy content
-- by pjh

-- DROP TABLES
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS reports;

CREATE TABLE IF NOT EXISTS users (
    email VARCHAR(255) NOT NULL,
    password VARCHAR(60) NOT NULL,
    name VARCHAR(60) NOT NULL,
    birthdate DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    UNIQUE(email)
);

-- CREATE TABLE reports
CREATE TABLE IF NOT EXISTS reports (
    id INTEGER,
    week CHAR(6) NOT NULL,
    writer VARCHAR(255) NOT NULL,
    report VARCHAR(5000) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (id),
    UNIQUE (week)
);

-- INSERT INTO reports
INSERT INTO reports (`week`, `writer`, `report`)
VALUES
    (
        "1",
        "pjh",
        "Test av vecka 1"
    ),
    (
        "2",
        "pjh",
        "Test av vecka 2"
    );