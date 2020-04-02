const controller = {};

controller.listAll = (req, res) => {
    // res.send("Si jala el customer list");
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM games', (err, games) => {
            if(err){
                res.send("Hubo un error");
            }
            console.log(games);
            res.json(games);
        });
    });;
};

controller.create = (req, res) => {
    const data = req.body;
    console.log(req.body)
    req.getConnection((err, connection) => {
    const query = connection.query('INSERT INTO games set ?', data, (err, data) => {
      console.log(data);
      res.redirect('/');
    })
  });
};

controller.listOne = (req, res) => {
  const { id } = req.params;
  req.getConnection((err, conn) => {
    conn.query("SELECT * FROM games WHERE id = ?", [id], (err, rows) => {
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
    conn.query('UPDATE games set ? where id = ?', [newCustomer, id], (err, rows) => {
      res.redirect('/');
    });
  });
};

controller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, connection) => {
      connection.query('DELETE FROM games WHERE id = ?', [id], (err, rows) => {
        res.redirect('/');
      });
    });
};

module.exports = controller;
