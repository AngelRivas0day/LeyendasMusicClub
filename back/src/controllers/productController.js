const controller = {};
const fs = require('fs');
const path = require('path');
var multer = require('multer');
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/uploads/products')
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg')
    }
});
var upload = multer({ storage: storage }).single('image');

controller.list = (req, res) => {
    // res.send("Si jala el customer list");
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM products', (err, prods) => {
            if(err){
                res.send("Hubo un error");
            }
            console.log(prods);
            res.json(prods);
        });
    });
};

controller.add = (req, res) => {
      // the same req, res params are passed to the upload function, in order to make it look like the og
  upload(req, res, function (err) {
    console.log(req.body);
    let data = req.body;
    if (err) {
        res.status(500).send({
            message: 'La info no fue actulizada con exito'
          });
    }else{
      if(req.file){
        const fileName = req.file.filename;
        data.image = fileName;
      }else{
        data.image = "No seteado...";
      }
      req.getConnection((err, conn) => {
          const query = conn.query('INSERT INTO products SET ?', [data], (err, rows) => {
            if(err){
              console.log(err);
            }else{
              res.status(200).send({
                message: 'La into fue creada con exito'
              });
            }
          });
      });
    }
});
};

controller.edit = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM products WHERE id = ?", [id], (err, rows) => {
    //   res.render('customers_edit', {
    //     data: rows[0]
    //   })
    console.log(rows);
    res.json(rows);
    });
  });
};

controller.update = (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  req.getConnection((err, conn) => {
    conn.query('UPDATE products set ? where id = ?', [newData, id], (err, rows) => {
      if(err){
        res.status(500).send({
          success: false,
          message: "Hubo un error al actualizar la información",
          error: err
        });
      }else{
        res.status(200).send({
          success: true,
          message: "ok"
        });
      }
    });
  });
};

controller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, connection) => {
      const query = connection.query('DELETE FROM products WHERE id = ?', [id], (err, rows) => {
        res.status(200).send({
          success: true,
          message: "El producto se ha eliminado",
          rows: rows
        })
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
            const query = conn.query('UPDATE products SET image = ? WHERE id = ?', [fileName, id], (err, rows) => {
              res.status(200).send({
                message: 'La foto fue actulizada con exito'
              });
            });
        });
    })
};

controller.getImage = (req, res) => {
  const fileName = req.params.fileName;
  var filePath = 'src/uploads/products/' + fileName;
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
