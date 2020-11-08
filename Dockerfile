FROM nginx:stable-alpine

RUN apk update && apk upgrade
RUN apk add --no-cache bash nodejs npm
WORKDIR /
COPY . /app/
WORKDIR /app
RUN mv -v default.conf /etc/nginx/conf.d/