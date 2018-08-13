import ConferenceModel from '../models/conferences';
import sendgrid from '@sendgrid/client';

async function createConference({
  body,
  headers,
  params,
  query
}) {
  const conferences = await ConferenceModel.create({
    authorEmail: body.authorEmail,
    authorName: body.authorName,
    address: body.address,
    attendUrl: body.attendUrl,
    codeOfConduct: body.codeOfConduct,
    cost: body.cost,
    dates: body.dates,
    description: body.description,
    diversityScholarship: body.diversityScholarship,
    latitude: body.latitude,
    location: body.location,
    longitude: body.longitude,
    name: body.name,
    published: body.published,
    speakerRegistration: body.speakerRegistration,
    tags: body.tags,
    twitter: body.twitter,
    website: body.website
  });
  
  if (body.authorEmail) {
    sendgrid.setApiKey(process.env.AOC_SENDGRID_API_KEY);
    await sendgrid.request({
      method: 'POST',
      url: '/v3/mail/send',
      body: {
        personalizations: [
          {
            to: [
              {
                email: body.authorEmail,
                name: body.authorName
              }
            ],
            subject: 'Thank You!',
            substitutions: {
              '%title%': 'Your Conf Has Been Submitted!',
              '%message%': 'We will review your submission and email you once it\'s been published.',
              '%buttonText%': 'LAUNCH SITE',
              '%buttonUrl%': 'https://arrayofconfs.com'
            }
          }
        ],
        from: {
          email: 'info@arrayofconfs.com',
          name: 'arrayOfConfs'
        },
        template_id: '741b5daa-2f23-4f3c-87f0-cdf945171765'
      }
    });
  }
  
  return {
    code: 201,
    body: {}
  };
}

export default createConference;
