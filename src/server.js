import bodyParser from 'body-parser';
import express from 'express';
import validator from 'is-my-json-valid';

import createConference from './operations/createConference';
import getAllConferences from './operations/getAllConferences';
import deleteConference from './operations/deleteConference';
import updateConference from './operations/updateConference';

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', req.get('origin') || 'http://api.alpha.zappjs.com:3001');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PATCH,PUT,DELETE,POST,OPTIONS');
  next();
});

app.get('/conferences', async (req, res) => {
  try {
    const response = await getAllConferences(req);
    res
      .status(response.code)
      .send(response.body);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        error: 'Internal server error'
      });
  }
});
app.post('/conferences', async (req, res) => {
  const validate = validator({
		'type': 'object',
		'properties': {
			'address': {
				'type': 'string'
			},
			codeOfConduct: {
				'type': 'string'
			},
			'cost': {
				'type': 'string'
			},
			'dates': {
				'type': 'string'
			},
			'description': {
				'type': 'string'
			},
			'location': {
				'type': 'string'
			},
			'name': {
				'type': 'string'
			},
			'tags': {
				'type': 'string'
			},
			'twitter': {
				'type': 'string'
			},
			'website': {
				'type': 'string'
			}
		}
	});
  const isValid = validate(req.body);
  if (!isValid) {
    res
      .status(400)
      .send({
        error: validate.errors
          .map((error) => {
            return `'${error.field.replace(/^data\./, '')}' ${error.message}`;
          })
          .join('. ')
          .concat('.')
      });
    return;
  }

  try {
    const response = await createConference(req);
    res
      .status(response.code)
      .send(response.body);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        error: 'Internal server error'
      });
  }
});
app.delete('/conferences/:conferenceId', async (req, res) => {

  try {
    const response = await deleteConference(req);
    res
      .status(response.code)
      .send(response.body);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        error: 'Internal server error'
      });
  }
});
app.patch('/conferences/:conferenceId', async (req, res) => {

  try {
    const response = await updateConference(req);
    res
      .status(response.code)
      .send(response.body);
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send({
        error: 'Internal server error'
      });
  }
});

app.listen(5000);
