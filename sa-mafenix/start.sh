./rancher-compose \
--project-name sa-mafenix-app \
--url http://http://35.203.113.3:8080/v1/projects/1a5 \
--access-key F958DB3B657A4AB70FB9  \
--secret-key pHC2qySZHf6TWeu5aKWQNzvxEE1ARUBHuFVkkqGu \
-f docker-compose.yml \
--verbose up \
-d --force-upgrade \
--confirm-upgrade
