var multer = require('multer');
const fs = require('fs');
const path = require('path');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/events')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
});
var upload = multer({ storage: storage }).single('image');

const controller = {};

controller.listAll = (req, res) => {
    // res.send("Si jala el customer list");
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM events', (err, events) => {
            if(err){
                res.send("Hubo un error");
            }
            console.log(events);
            res.json(events);
        });
    });;
};

controller.create = (req, res) => {
    const data = req.body;
    console.log(req.body)
    req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO events set ?', data, (err, data) => {
      console.log(data);
      res.redirect('/');
    })
  });
};

controller.listOne = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM events WHERE id = ?", [id], (err, rows) => {
    //   res.render('customers_edit', {
    //     data: rows[0]
    //   })
    console.log(rows);
    res.json(rows);
    });
  });
};

controller.edit = (req, res) => {
  const { id } = req.params;
  const newCustomer = req.body;
  req.getConnection((err, conn) => {
    conn.query('UPDATE events set ? where id = ?', [newCustomer, id], (err, rows) => {
      res.redirect('/');
    });
  });
};

controller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, connection) => {
      connection.query('DELETE FROM events WHERE id = ?', [id], (err, rows) => {
        res.redirect('/');
      });
    });
};

controller.uploadImage = (req, res) => {
  const id = req.params.id;
    upload(req, res, function (err) {
        if (err) {
            res.status(500).send({
                message: 'La foto no fue actulizada con exito'
              });
        }
        // Everything went fine
        const fileName = req.file.filename;
        req.getConnection((err, conn) => {
            const query = conn.query('UPDATE events SET imageUrl = ? WHERE id = ?', [fileName, id], (err, rows) => {
              res.status(200).send({
                message: 'La foto fue actulizada con exito'
              });
            });
        });
    })
};

controller.getImage = (req, res) => {
  const fileName = req.params.fileName;
  var filePath = 'src/uploads/events/' + fileName;
  console.log(filePath);
  fs.exists(filePath, (exists)=>{
    if(exists){
      console.log(path.resolve(filePath));
      res.sendFile(path.resolve(filePath));
    }else{
      res.send({
        message: 'no existe'
      })
    }
  });
};

module.exports = controller;
