FROM node:18-alpine
WORKDIR /app

COPY /dist /app

RUN find . -name "server-dev" -delete

RUN echo '{ "type": "module", "dependencies": {"express": "^4.18.2","fs": "^0.0.1-security","path": "^0.12.7","compression": "^1.7.4","serve-static": "^1.15.0","vite": "^4.4.5","url": "^0.11.2","react": "^18.2.0","react-dom": "^18.2.0","react-router-dom": "^6.15.0"} }' > package.json

RUN npm install

CMD ["node", "server.js"]