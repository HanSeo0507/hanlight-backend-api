FROM node:10.15.3   

RUN echo "Asia/Seoul" > /etc/timezone
RUN dpkg-reconfigure -f noninteractive tzdata

RUN mkdir -p /app

WORKDIR /app

ADD ./ /app

RUN npm install

EXPOSE 3000

CMD npm run start