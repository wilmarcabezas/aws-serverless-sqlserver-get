const Responses = require('./common/API_Responses');
const AWS = require('aws-sdk');
const cors = require('cors');
const SES = new AWS.SES();

const sql = require('mssql');

const dbSettings = {
    user: 'user',
    password: 'pwd',
    server: 'server',
    database: 'base',
    options: {
      encrypt: false,
      trustServerCertificate: true,
    },
  };
//Funcion para registro
const querys = {
    addTareaEmpleado: "INSERT INTO [dbo].[TareasEmpleado]([tarea],[empleado],[orden],[cliente],[estado])VALUES(@tarea,@empleado,@orden,@cliente, 'Pendiente')",
    getAddressByName: "SELECT * FROM address Where NOMBRE = @name and USUARIO=@user",
};

const getConnection = async () => {
    const pool = await sql.connect(dbSettings);
    return pool;
};

exports.sendEmail = async event => {

    // Habilito CORS
    cors();

    //Recibo objetos
    const { to, from, subject, text, id, cliente, ordennumero } = JSON.parse(event.body);

    //Valido que los Datos vengan completos
    if (!to || !from || !subject || !text) {
        return Responses._400({
            message: 'Faltan campos en la solicitud',
        });
    }

    //Separo los Id para registrar en la base de datos
    const to_Ids = id.split(',');

    for (idE of to_Ids) {
        const pool = await sql.connect(dbSettings);
        const result = await pool
            .request()
            .input('tarea',sql.Int,1)
            .input('empleado',sql.Int,idE)
            .input('orden',sql.Int,ordennumero)
            .input('cliente',sql.Int,cliente)
            .query(querys.addTareaEmpleado);
            }

    //Separo las direccion de Correo
    const To_Emails = to.split(',');

    //Envio los mensajes de correo
    for (const email of To_Emails) {

        const params = {
            Destination: {
                ToAddresses: [email],
            },
            Message: {
                Body: {
                    Text: { Data: text },
                },
                Subject: { Data: subject },
            },
            Source: from,
        };

        try {
            await SES.sendEmail(params).promise();
            return Responses._200({ params });
        } catch (error) {
            console.log('error sending email ', error);
            return Responses._400({ message: 'The email failed to send' });
        }
    }


};