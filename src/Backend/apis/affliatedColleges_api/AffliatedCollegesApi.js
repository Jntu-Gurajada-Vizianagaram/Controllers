const connection = require('../config')

exports.insert_college = (req, res) => {
  const data = req.body;
  const sql = 'INSERT INTO colleges_list (logo, college_name, college_address,college_link) VALUES (?, ?, ?, ?)';

  connection.query(sql, [data.logo, data.college_name, data.college_address, data.college_link], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ error: 'Error inserting data' });
      return;
    }
    console.log('Data inserted successfully');
    res.json({ message: 'Data inserted successfully' });
  });
};


exports.delete_college = (req, res) => {
const collegeName = req.params.college_name;
const sql = 'DELETE FROM colleges_list WHERE college_name = ?';

connection.query(sql, collegeName, (err, result) => {
  if (err) {
    console.error('Error deleting data:', err);
    res.status(500).json({ error: 'Error deleting data' });
    return;
  }
  console.log('Data deleted successfully');
  res.json({ message: 'Data deleted successfully' });
});
};

exports.get_colleges = (req, res) => {
  const sql = 'SELECT * FROM colleges_list';

  connection.query(sql, (err, results) => {
    if (err) {
      console.error('Error retrieving data:', err);
      res.status(500).json({ error: 'Error retrieving data' });
      return;
    }
    console.log('Data retrieved successfully');
    res.json(results);
  });
};

