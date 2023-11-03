const connection = require('../config')

exports.insert_college = (req, res) => {
  const {data} = req.body;
  const int = 0;
  const sql = 'INSERT INTO affiliated_colleges (id,logo, college_name, college_address,college_link) VALUES (?,?, ?, ?, ?)';

  connection.query(sql, [int,data.logo, data.college_name, data.college_address, data.college_link], (err, result) => {
    if (err) {
      console.error('Error inserting data:', err);
      res.status(500).json({ error: 'Error inserting data' });
      return;
    }
    console.log('Data inserted successfully');
    res.json({ message: 'Data inserted successfully' });
  });
};

exports.update_college= (req, res) => {
  const updateId = req.params.id;
  const { update } = req.body;

  const sql = 'UPDATE affiliated_colleges SET logo=?, college_name=?,  college_address=?, college_link=? WHERE id=?';
  const values = [update.logo, update.college_name,  update.college_address, update.college_link];

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


exports.delete_college = (req, res) => {
const collegeName = req.params.college_name;
const sql = 'DELETE FROM affiliated_colleges WHERE college_name = ?';

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
  const sql = 'SELECT * FROM affiliated_colleges';

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