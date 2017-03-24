docker run -d --name elevator_db -p 3307:3306 tutum/mysql -e MYSQL_PASS=bodyguy -e ON_CREATE_DB="elevator"
docker build --no-cache --build-arg GIT_BRANCH=master -t elevator:1.0 ./docker/app/
docker run --name elevator_app -e NODE_ENV=development -e ENV_RUN_CMD='node app.js'