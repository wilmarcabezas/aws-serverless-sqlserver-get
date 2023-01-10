# AWS Serverless SQL Server GET 🚀

Este repositorio proporciona una solución de servidorless para realizar consultas GET a una base de datos SQL Server en Amazon Web Services (AWS).

## Requisitos previos
- Cuenta de AWS
- Acceso a una instancia de SQL Server en AWS

## Instalación
1. Clona este repositorio en tu máquina local: git clone https://github.com/wilmarcabezas/aws-serverless-sqlserver-get.git
2. Instala las dependencias necesarias ejecutando el siguiente comando: npm install


## Uso
1. Configura las credenciales de acceso a AWS y a tu instancia de SQL Server en el archivo `config.js`.
2. Ejecuta el siguiente comando para desplegar la solución de servidorless: serverless deploy


Una vez desplegada, podrás realizar consultas GET a tu base de datos SQL Server utilizando la URL proporcionada por la solución de servidorless.

Para más información sobre cómo utilizar esta solución, consulta la [documentación de AWS sobre servidorless](https://aws.amazon.com/es/serverless/) y la [documentación de Microsoft sobre SQL Server](https://docs.microsoft.com/es-es/sql/sql-server/?view=sql-server-ver15).

```` yml
service: addresscontrol
frameworkVersion: '3'

provider:
  name: aws
  runtime: nodejs14.x
  stage: dev
  region: us-east-1
  environment:
    TOPIC_ARN: 'arn:aws:sns:us-east-1:AccoutID:NotifyCourier'
    TARGET_ARN: 'arn:aws:sns:us-east-1:AccoutID:NotifyCourier:endpoint'

functions:
  AllAddress:
    handler: handler.AllAddress
    events:
      - http:
          method: get
          path: scanaddress
          cors: true 
  OneAddress:
    handler: handler.OneAddress
    events:
      - http:
          method: post
          path: getaddress
          cors: true 
  sendEmail:
    handler: senderEmailTask.sendEmail
    events:
      - http:
          method: post
          path: sendemail
          cors: true
    iamRoleStatements:
      - Effect: Allow
        Action:
          - ses:*
        Resource: '*'

plugins:
  - serverless-iam-roles-per-function
  


````

# Archivo serverless.yml

Este archivo define la configuración de nuestra solución de servidorless para realizar consultas GET a una base de datos SQL Server en AWS.

## Propiedades

- `service`: Nombre de nuestro servicio de servidorless.
- `provider`: Proveedor de nuestro servicio de servidorless (en este caso, AWS).
- `functions`: Funciones que conforman nuestro servicio de servidorless. Cada función tiene las siguientes propiedades:
  - `handler`: Archivo y nombre de la función que se ejecutará cuando se invoque esta función de servidorless.
  - `events`: Eventos que dispararán la ejecución de esta función. En este caso, tenemos un evento de tipo `http`, que significa que nuestra función será invocada mediante una solicitud HTTP.
  - `environment`: Variables de entorno que necesitará nuestra función para acceder a la base de datos SQL Server. Estas variables deben configurarse en el archivo `config.js`.

Para más información sobre la sintaxis y las propiedades disponibles en el archivo `serverless.yml`, consulta la [documentación de Serverless Framework](https://www.serverless.com/framework/docs/providers/aws/guide/serverless.yml/).

