FROM keymetrics/pm2:10-alpine

# Bundle files
COPY dist .
COPY node_modules node_modules

ARG APP_ENV

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
ENV NODE_ENV $APP_ENV

# Expose the listening port
EXPOSE 3333

# Show current folder structure in logs
RUN ls -al -R

CMD node index.js
