#!/usr/bin/env node

const { Client } = require("pg");
const messages = require("../data/messageData");
require("dotenv").config();

const SQL = `
DROP TABLE IF EXISTS messages;

CREATE TABLE IF NOT EXISTS messages (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255),
  message TEXT,
  date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  await client.connect();
  await client.query(SQL);

  const insertPromises = messages.map((message) => {
    return client.query(
      `INSERT INTO messages (username, message, date) VALUES ($1, $2, $3)`,
      [message.username, message.message, message.date]
    );
  });

  await Promise.all(insertPromises);
  await client.end();
  console.log("done");
}

main().catch(console.error);
