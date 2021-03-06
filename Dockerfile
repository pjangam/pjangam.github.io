FROM node:14.16.0-alpine
COPY build build
RUN npm i -g serve
EXPOSE 5000
CMD ["serve", "-s", "build"]