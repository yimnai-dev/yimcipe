# Build for Local Development
# FROM node:18-alpine as development

# RUN sed -i -e 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories && \
#     apk update && \
#     apk add bash

# ENV DATABASE_CONNECTION_STRING=${DATABASE_CONNECTION_STRING}
# ENV JWT_SECRET_KEY=${JWT_SECRET_KEY}
# ENV GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
# ENV GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}
# ENV YIMCIPE_EMAIL=${YIMCIPE_EMAIL}
# ENV YIMCIPE_PASSWORD=${YIMCIPE_PASSWORD}
# ENV SMTP_HOST=${SMTP_HOST}
# ENV EXPRESS_SESSION_SECRET=${EXPRESS_SESSION_SECRET}

# WORKDIR /usr/src/app

# COPY --chown=node:node package.json pnpm-lock.yaml ./

# RUN apk add certbot-nginx

# COPY nginx.conf /etc/nginx/conf.d/default.conf

# RUN mkdir -p /usr/share/nginx/html
# COPY certbot.ini /etc/letsencrypt/

# RUN certbot certonly --webroot -w /usr/share/nginx/html -d api.yimla.site --agree-tos --non-interactive --email yimnai.dev@outlook.com

# # Renew the certificate periodically
# RUN echo "0 0 * * * certbot renew --webroot -w /usr/share/nginx/html --quiet --no-self-upgrade" | crontab -

# RUN npm install -g pnpm

# RUN pnpm install

# COPY --chown=node:node . ./

# # Build for app build
# FROM node:18-alpine as build

# WORKDIR /usr/src/app

# COPY --chown=node:node package.json pnpm-lock.yaml ./

# COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

# COPY --chown=node:node . .

# RUN npm install -g pnpm

# RUN pnpm run build

# # Build for production
# FROM node:18-alpine as production

# COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules

# COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# # CMD ["node", "dist/main.js"]
# CMD ["nginx", "-g", "daemon off;"]

# Build for Local Development
FROM node:18-alpine as development

RUN sed -i -e 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories && \
    apk update && \
    apk add bash

ENV DATABASE_CONNECTION_STRING=${DATABASE_CONNECTION_STRING}
ENV JWT_SECRET_KEY=${JWT_SECRET_KEY}
ENV GOOGLE_CLIENT_ID=${GOOGLE_CLIENT_ID}
ENV GOOGLE_CLIENT_SECRET=${GOOGLE_CLIENT_SECRET}
ENV YIMCIPE_EMAIL=${YIMCIPE_EMAIL}
ENV YIMCIPE_PASSWORD=${YIMCIPE_PASSWORD}
ENV SMTP_HOST=${SMTP_HOST}
ENV EXPRESS_SESSION_SECRET=${EXPRESS_SESSION_SECRET}

WORKDIR /usr/src/app

COPY --chown=node:node package.json pnpm-lock.yaml ./

RUN npm install -g pnpm

RUN pnpm install

COPY --chown=node:node . ./

# Build for app build
FROM node:18-alpine as build

WORKDIR /usr/src/app

COPY --chown=node:node package.json pnpm-lock.yaml ./

COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

COPY --chown=node:node . .

RUN npm install -g pnpm

RUN pnpm run build

# Install and configure Nginx
FROM nginx:1.21-alpine as nginx

# Copy Nginx configuration
COPY reverse-proxy.conf /etc/nginx/conf.d/default.conf

# Create directory and copy certbot config
RUN mkdir -p /usr/share/nginx/html
COPY certbot.ini /etc/letsencrypt/

# Copy the built app to the Nginx public directory
COPY --from=build /usr/src/app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80 3333

# Build for production
FROM node:18-alpine as production

COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules

COPY --chown=node:node --from=build /usr/src/app/dist ./dist

CMD ["node", "dist/main.js"]

