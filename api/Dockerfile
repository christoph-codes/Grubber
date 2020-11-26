FROM keymetrics/pm2:10-alpine

# Bundle files
COPY pm2.json .
COPY dist .
COPY node_modules node_modules

# Define build arguments
ARG APP_ENV
ARG DB_HOST
ARG DB_USER
ARG DB_PASS
ARG DB
ARG GRUBBER_REDIS
ARG GRUBBER_REDIS_PORT

# Define environment variables
ENV NPM_CONFIG_LOGLEVEL warn
ENV NODE_ENV $APP_ENV
ENV GRUBBER_DBHOST $DB_HOST
ENV GRUBBER_DBUSER $DB_USER
ENV GRUBBER_DBPASS $DB_PASS
ENV GRUBBER_DB $DB
ENV GRUBBER_REDIS $GRUBBER_REDIS
ENV GRUBBER_REDIS_PORT $GRUBBER_REDIS_PORT

# Expose the listening port
EXPOSE 3333

# Show current folder structure in logs
RUN ls -al

CMD pm2-runtime start pm2.json
