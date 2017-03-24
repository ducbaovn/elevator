FROM ubuntu:14.04

ARG GIT_BRANCH=no_branch

ENV ENV_RUN_CMD='echo you-must-define-run-command'

RUN apt-get update && apt-get install -y curl

RUN curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -

RUN apt-get update && apt-get install -y \
  build-essential \
  nodejs \
  git

RUN git clone https://github.com/ducbaovn/elevator.git
WORKDIR /elevator/
RUN git checkout $GIT_BRANCH
RUN git pull origin $GIT_BRANCH

RUN npm install
CMD $ENV_RUN_CMD