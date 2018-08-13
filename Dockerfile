FROM node
ENV PATH ./node_modules/.bin:$PATH
COPY . /code
WORKDIR /code
RUN npm install
CMD npm start
