# lookafter_diapers

Simple crud for selling diapers using nodejs, mongo, haproxy and docker.

How To Use

To clone and run this application, you'll need Git, Docker and docker-compose. From your command line:

# Clone this repository
$ git clone https://github.com/zehamarall/lookafter_diapers

# Go into the repository
$ cd lookafter_diapers

# Build app
$ docker-compose build

# Run the app
$ docker-compose up

# Acess this app URL 

get 127.0.0.1:8080/api/diapers
post 127.0.0.1:8080/api/diapers
put 127.0.0.1:8080/api/diapers/<id>
del 127.0.0.1:8080/api/diapers/<id>
