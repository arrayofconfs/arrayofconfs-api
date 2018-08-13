import mongoose from 'mongoose';

mongoose.connect('mongodb://db/test');

const conferencesSchema = new mongoose.Schema({
  address: {
    type: String
  },
  attendUrl: {
    type: String
  },
  authorEmail: {
    type: String
  },
  authorName: {
    type: String
  },
  codeOfConduct: {
    type: String
  },
  cost: {
    type: String
  },
  dates: {
    type: String
  },
  description: {
    type: String
  },
  diversityScholarship: {
    type: String
  },
  latitude: {
    type: Number
  },
  location: {
    type: String
  },
  longitude: {
    type: Number
  },
  name: {
    required: true,
    type: String
  },
  published: {
    type: Boolean
  },
  speakerRegistration: {
    type: String
  },
  tags: {
    type: String
  },
  twitter: {
    type: String
  },
  website: {
    type: String
  }
});

const ConferencesModel = mongoose.model(
  'Conferences',
  conferencesSchema
);

export default ConferencesModel;
