./rancher-compose \
--project-name sa-mafenix-app \
--url http://35.203.28.184:8080/v1/projects/1a5 \
--access-key 4BBB964EA311800A231C  \
--secret-key 9gdB5QGmJX2X9wCUnGzstrrqRd6KQNhKmpyrNzxZ \
-f docker-compose.yml \
--verbose up \
-d --force-upgrade \
--confirm-upgrade
