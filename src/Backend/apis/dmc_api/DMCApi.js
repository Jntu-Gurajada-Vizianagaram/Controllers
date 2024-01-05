const multer = require('multer');
const connection = require('../config')

const storage = multer.diskStorage({
  destination: (req, file, cb )=>{
    return cb(null,'./storage/dmc/')
  },
  filename: (req, file, cb)=>{
    return cb(null,`${file.originalname}`)
  }
})

exports.Upload = multer({storage}).single('file')

exports.insert_event =  (req, res) => {

  const  upload  = req.body;
  const  file  = req.file;
  console.log(upload )
  console.log("File"+file.originalname)
  const int = 0;
  const sql = 'INSERT INTO dmc_upload (id, date, title,  file_path, description, submitted) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [int, upload.date, upload.title,  file.originalname , upload.description, upload.submitted];

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
const id = req.params.id;
const sql = `DELETE FROM dmc_upload WHERE id = ${id}`;

connection.query(sql, (err, result) => {
  if (err) {
    console.error('Error deleting data:', err);
    res.status(500).json({ error: 'Error deleting data' });
    return;
  }
  console.log('Data deleted successfully');
  res.json({ message: 'Data deleted successfully' });
});
};

exports.all_events=(req, res) => {
  const sql = "SELECT * FROM dmc_upload ORDER BY id DESC";

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
  const uploadId = req.params.id;
  const { upload } = req.body;

  const sql = 'UPDATE dmc_upload SET date=?, title=?,  fil_path=?, description=?, submitted=? WHERE id=?';
  const values = [upload.date, upload.title,  upload.filepath, upload.description, upload.submitted];

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


