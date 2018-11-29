# Docker Commands

## Backups

start docker containers (site will be on localhost:8080)

- `docker-compose up`

Locate the running database container hash ID with `docker ps` (example is 711464597d8c for mariadb) use that in place of the CONTAINER in the below commands, run via powershell

### Backup DB (Replace CONTAINER with UID, run `docker ps` to see containers)

- `docker exec CONTAINER /usr/bin/mysqldump -u root --password=AppleSucks drupal > backup.sql`

### Restore DB

- `cat backup.sql | docker exec -i CONTAINER /usr/bin/mysql -u root --password=root DATABASE`

## Clean up exited containers

Exited containers are not running, but use up hard drive space. To remove all exited containers use `docker rm $(docker ps -a -q -f status=exited)`
