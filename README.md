#MAFENIX 

## Primera consola "microservicios"
1. Para desplegar todos los microservicios se paran en la carpeta raiz y ejecutan los siguientes comandos ("el paso 2 y 3 solo se realiza en el primer despliegue").
``` $ docker-machine start rancher-server ``` "Si ya esta iniciado omitir"
``` $ docker-machine start rancher-node1 ``` "Si ya esta iniciado omitir"
``` $ eval $(docker-machine env rancher-node1) ``` "Si ya esta parado en el nodo1 omitir"
``` $ docker-compose build ```
``` $ docker-compose up ```

"Unicamente en el primer despliegue" 
2. Dentro del arministrador rancher-server "http://192.168.99.100:8080/env/1a5/infra/hosts"
Iniciar migraciones de rails en la consola del microservicio resources-ms dar clic en los 3 punticos a la derecha del nombre del microservicio resources-ms "Execute Shell"
``` $ rails db:create ```
``` $ rails db:migrate```
``` $ rails db:seed ```

"Unicamente en el primer despliegue" 
3. Iniciar migaciones de python en la consola del microservicio comments-ms dar clic en los 3 punticos a la derecha del nombre del microservicio comments-ms "Execute Shell" ejecutar ahí los siguientes comandos.
``` $ python manage.py makemigrations snippets ```
``` $ python manage.py migrate ```

## Segunda consola "api-gateway"
``` $ cd mafenix-api/ ```
``` $ eval $(docker-machine env rancher-node1) ```
``` $ docker-compose build``` 
``` $ docker-compose up ```

## Tercera consola "Web-front"
``` $ cd mafenix-wa/ ```
``` $ npm install ```
``` $ npm start ```
## Cuarta consola "Movil-front"
``` $ cd mafenix-ma/ ```
``` $ npm install ```
``` $ expo start ```


