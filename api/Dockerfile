FROM keymetrics/pm2:10-alpine

# Bundle files
COPY pm2.json .
COPY dist .
COPY node_modules node_modules

ARG APP_ENV

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
ENV NODE_ENV $APP_ENV

# Expose the listening port
EXPOSE 3333

# Show current folder structure in logs
RUN ls -al

RUN pwd

RUN tail -f /logs/grubber-access.log /logs/grubber-debug.log /logs/grubber-error.log > /temp/stdout.log 

CMD pm2-runtime start pm2.json
