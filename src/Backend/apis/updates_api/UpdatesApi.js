const connection = require('../config')

exports.insert_event =  (req, res) => {
  const { data } = req.body;

  const sql = 'INSERT INTO events (title, date, time, location, description) VALUES (?, ?, ?, ?, ?)';
  const values = [data.title, data.date, data.time, data.location, data.description];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ error: 'Error inserting data' });
      return;
    }
    console.log('Data inserted successfully');
    res.json({ message: 'Data inserted successfully' });
  });
};

exports.delete_event=(req, res) => {
const title = req.params.title;
const sql = 'DELETE FROM events WHERE title = ?';

connection.query(sql, title, (err, result) => {
  if (err) {
    console.error('Error deleting data:', err);
    res.status(500).json({ error: 'Error deleting data' });
    return;
  }
  console.log('Data deleted successfully');
  res.json({ message: 'Data deleted successfully' });
});
};

exports.get_events=(req, res) => {
  const sql = 'SELECT * FROM events';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving data:', err);
      res.status(500).json({ error: `Error retrieving data${err} `});
      return;
    }
    console.log('Data retrieved successfully');
    res.json(results);
  });
};


exports.update_event= (req, res) => {
  const eventId = req.params.id;
  const { data } = req.body;

  const sql = 'UPDATE events SET title=?, date=?, time=?, location=?, description=? WHERE id=?';
  const values = [data.title, data.date, data.time, data.location, data.description, eventId];

  connection.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error updating data:', err);
      res.status(500).json({ error: 'Error updating data' });
      return;
    }
    console.log('Data updated successfully');
    res.json({ message: 'Data updated successfully' });
  });
};
