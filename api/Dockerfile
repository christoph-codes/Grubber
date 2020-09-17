FROM keymetrics/pm2:10-alpine

# Bundle files
COPY pm2.json .
COPY dist .
COPY node_modules node_modules

ARG APP_ENV
ARG DB_HOST
ARG DB_USER
ARG DB_PASS
ARG DB

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
ENV NODE_ENV $APP_ENV
ENV GRUBBER_DBHOST $DB_HOST
ENV GRUBBER_DBUSER $DB_USER
ENV GRUBBER_DBPASS $DB_PASS
ENV GRUBBER_DB $DB

# Expose the listening port
EXPOSE 3333
EXPOSE 3306

# Show current folder structure in logs
RUN ls -al

CMD pm2-runtime start pm2.json
