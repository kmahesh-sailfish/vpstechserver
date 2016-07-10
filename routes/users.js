var express = require('express');
var router =function(pool){
  var accountRouter=express.Router();

  /* GET users listing. */
  accountRouter.route('/display').get(function(req, res, next) {
    var query='select * from Users';
    pool.getConnection(function(err,connection){
      connection.query(query,function(err,rows){
        connection.release();
        if(err){
          console.log(err);
          res.status(500).send('500 Error'+err);
        }
        else
        {
          res.status(200).json(rows);
        }
      })
    })

  });
  accountRouter.route('/inseruser').post(function(req, res, next) {
    var query="insert into Users(userName,userLastname,useraddress,useremail,password) values"+"('" +req.body['Name']+"','"+req.body['Lastname']+"','"+
        req.body['Address']+"','"+req.body['Email']+"','"+req.body['password']+"')";
    pool.getConnection(function(err,connection){
      connection.query(query,function(err,rows){
        connection.release();
        if(err){
          console.log(err);
          res.status(500).send('500 Error'+err);
        }
        else
        {
          res.status(200).json(rows);
        }
      })
    })
  });

  accountRouter.route('/getuserbyid').get(function(req,res,next)
  {


    pool.getConnection(function (err, connection)
    {

      connection.release();
      if (req.query.idUsers)
      {
        var query = "select * from Users where idUsers= '" + req.query.idUsers + "'";

        connection.query(query, function (err, rows)
        {
          if (err)
          {
            console.log(err);
            res.status(500).send('500 Error :' + err);
          }
          else
          {
            console.log(rows);
            res.status(200).json(rows);
          }
        });
      }
      else
      {
        console.log('id is undefind')
      }
    })
  });

  accountRouter.route('/updateuser').put(function(req,res,next){
    if (req.query.idUsers) {


     /* var query="UPDATE Users SET userName='"+req.body['userName']+"','"+req.bodywhere idUsers= '"+req.query.idUsers+"'";*/
      var query="UPDATE Users SET userName='"+req.body['Name']+"',userLastname='"+req.body['Lastname']+"',useraddress='"+req.body['Address']+"',useremail='"+req.body['Email']+"'where idUsers= '"+req.query.idUsers+"'";
      pool.getConnection(function(err,connection){
        connection.query(query,function(err,rows){
          connection.release();
          if(err)
          {
            console.log(err);
            res.status(500).send('500 Error'+err);

          }
          else
          {
            res.status(200).json(rows);
          }
        })
      })
    }

  })
  accountRouter.route('/delete').delete(function(req,res,next)
  {
    pool.getConnection(function (err, connection)
    {
      connection.release();
      if (req.query.idUsers)
      {

        var query = "delete from Users where idUsers ='" + req.query.idUsers + "'";

        connection.query(query, function (err, rows)
        {
          if (err)
          {
            console.log(err);
            res.status(500).send('500 Error :' + err);
          }
          else
          {
            console.log(rows);
            res.status(200).json(rows);
          }
        });
      }
    })
  });
 return accountRouter
}


module.exports = router;
