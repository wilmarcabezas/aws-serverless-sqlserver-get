'use strict';

const sql = require('mssql');

const dbSettings = {
  user: 'user',
  password: 'clave',
  server: 'server',
  database: 'database',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const querys = {
  getAllAddress: "SELECT * FROM address",
  getAddressByName: "SELECT * FROM address Where NOMBRE = @name and USUARIO=@user",
};

const getConnection = async () => {
  const pool = await sql.connect(dbSettings);
  return pool;
};

exports.AllAddress = async event => {
  const pool = await sql.connect(dbSettings);
  const result = await pool.request().query(querys.getAllAddress);
  console.log(result.recordset);

  return {
    'statusCode': 200,
    'body': JSON.stringify({
      data: result.recordset,
    })
  }
}



exports.OneAddress = async (event) => {
  const pool = await sql.connect(dbSettings);
  let data = JSON.parse(event.body);
  console.log(data);
  console.log(event.queryStringParameters.user);

  const result = await pool
    .request()
    .input("name", data.name)
    .input("user", event.queryStringParameters.user)
    .query(querys.getAddressByName);

  return {
    'statusCode': 200,
    'body': JSON.stringify({data: result.recordset,}),
    'headers': {'Access-Control-Allow-Origin': '*' },
  }

}
