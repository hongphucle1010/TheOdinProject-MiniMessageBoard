#! /usr/bin/env node

const { Client } = require("pg");
const messages = require("../data/messageData");
require("dotenv").config();
const SQL = `
DROP TABLE IF EXISTS messages;

CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 ),
  message TEXT,
  date TIMESTAMP
);

${messages
  .map((message) => {
    const formattedDate = message.added.toISOString(); // Format the date to ISO string
    return `
          INSERT INTO messages (username, message, date)
          VALUES ('${message.user}', '${message.text}', '${formattedDate}');
      `;
  })
  .join("")}
  
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB}`,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
