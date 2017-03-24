docker run -d --name elevator_db -e MYSQL_PASS=bodyguy -e ON_CREATE_DB="elevator" tutum/mysql
docker build --no-cache --build-arg GIT_BRANCH=master -t elevator:1.0 ./docker/app/
docker run --name elevator_app --link elevator_db -e NODE_ENV=development -e ENV_RUN_CMD='node app.js' -p 1337:1337 elevator:1.0