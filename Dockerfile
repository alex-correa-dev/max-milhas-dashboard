FROM node:8.9.3
EXPOSE 7070

WORKDIR /opt/max-milhas-dashboard
COPY . /opt/max-milhas-dashboard

RUN npm install --only=production && /opt/max-milhas-dashboard/node_modules/.bin/bower install --only=production --allow-root

COPY . .

ENTRYPOINT ["./entrypoint.sh"]
CMD ["max-milhas-dashboard"]