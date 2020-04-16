var multer = require('multer');
const fs = require('fs');
const path = require('path');
const controller = {};

controller.listAll = (req, res) => {
    // res.send("Si jala el customer list");
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM gameCategories', (err, gameCategories) => {
            if(err){
                res.send("Hubo un error");
            }
            console.log(gameCategories);
            res.json(gameCategories);
        });
    });;
};

controller.create = (req, res) => {
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
          const query = conn.query('INSERT INTO gameCategories SET ?', [data], (err, rows) => {
            if(err){
              console.log(err);
              res.status(500).send({
                success: false,
                message: "El evento no fue creado",
                data: rows
              });
            }else{
              res.status(200).send({
                success: true,
                message: "El evento fue creado",
                data: rows
              });
            }
          });
      });
    }
  });
};

controller.listOne = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM gameCategories WHERE id = ?", [id], (err, rows) => {
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
    conn.query('UPDATE gameCategories set ? where id = ?', [newCustomer, id], (err, rows) => {
      res.redirect('/');
    });
  });
};

controller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, connection) => {
      connection.query('DELETE FROM gameCategories WHERE id = ?', [id], (err, rows) => {
        res.redirect('/');
      });
    });
};

module.exports = controller;
