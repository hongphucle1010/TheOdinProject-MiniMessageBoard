const pool = require("./pool");

const getMessages = async () => {
  const client = await pool.connect();
  const { rows } = await client.query(
    "SELECT username, message, date FROM messages ORDER BY date DESC"
  );
  console.log(rows);
  client.release();
  return rows;
};

const insertMessage = async (message, username) => {
  const client = await pool.connect();
  await client.query(
    "INSERT INTO messages (message, username, date) VALUES ($1, $2, $3)",
    [message, username, new Date()]
  ); 
  client.release();
};

module.exports = { getMessages, insertMessage };
