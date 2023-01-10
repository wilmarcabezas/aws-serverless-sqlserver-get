# AWS Serverless SQL Server GET
Este repositorio contiene un ejemplo de cómo usar AWS Lambda y el marco de trabajo Serverless para recuperar datos de una base de datos de SQL Server y devolverlos en la respuesta HTTP.

## :rocket: Inicio rápido

1. Instale el marco de trabajo Serverless: npm install -g serverless
2. Clone este repositorio: git clone https://github.com/wilmarcabezas/aws-serverless-sqlserver-get.git
3. Vaya al directorio: cd aws-serverless-sqlserver-get
4. Instale las dependencias: npm install
5. Configure sus credenciales de AWS
6. Despliegue la función: serverless deploy

## :page_facing_up: Configuración
Necesitará configurar algunas cosas antes de poder desplegar esta función.

### Variables de entorno
Renombre el archivo env.example a env.yml y complete las siguientes variables:

1. SQL_SERVER_HOST: El nombre de host o la dirección IP de su instancia de SQL Server
2. SQL_SERVER_USERNAME: El nombre de usuario para conectarse a la base de datos
3. SQL_SERVER_PASSWORD: La contraseña del usuario
4. SQL_SERVER_DATABASE: El nombre de la base de datos que desea consultar Permisos de IAM
5. Su usuario de IAM de AWS necesitará los siguientes permisos:

      * rds: Connect
      * rds:DescribeDBInstances
      * rds:DescribeDBLogFiles
      * rds:ListTagsForResource
      * Puede otorgar estos permisos mediante una política de IAM similar a la siguiente:
