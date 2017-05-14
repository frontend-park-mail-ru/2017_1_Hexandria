FROM nginx:1.13-alpine

RUN apk add --update bash

RUN mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default.conf.backup
COPY ./hexandria.conf        /etc/nginx/conf.d/
COPY ./hexandria_listen.conf /etc/nginx/


RUN mkdir /hexandria
COPY ./hexandria_port.sh /hexandria/
RUN chmod +x /hexandria/hexandria_port.sh
COPY ./dist /hexandria/dist

CMD /hexandria/hexandria_port.sh /etc/nginx/hexandria_listen.conf && nginx -g 'daemon off;'
