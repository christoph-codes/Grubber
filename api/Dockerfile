FROM keymetrics/pm2:10-alpine

# Bundle files
COPY tsconfig.json .
COPY api api/
COPY constants constants/
COPY routes routes/
COPY app.ts .
COPY env.ts .
COPY index.ts .
COPY middlewares.ts .
COPY package.json .
COPY pm2.json .

ARG APP_ENV

# Install app dependencies
ENV NPM_CONFIG_LOGLEVEL warn
ENV NODE_ENV $APP_ENV
RUN npm install --production

# Expose the listening port
EXPOSE 3333

# Show current folder structure in logs
RUN ls -al -R

CMD pm2 start pm2.json
