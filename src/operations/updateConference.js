import ConferenceModel from '../models/conferences';
import sendgrid from '@sendgrid/client';

async function updateConference({
  body,
  headers,
  params,
  query
}) {
  const conference = await ConferenceModel.findById(params.conferenceId);
  
  await ConferenceModel.findByIdAndUpdate(
    params.conferenceId,
    {
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
    }
  );
  
  if (body.notifyAuthor && conference.authorEmail) {
    sendgrid.setApiKey(process.env.AOC_SENDGRID_API_KEY);
    await sendgrid.request({
      method: 'POST',
      url: '/v3/mail/send',
      body: {
        personalizations: [
          {
            to: [
              {
                email: conference.authorEmail,
                name: conference.authorName
              }
            ],
            subject: 'Published!',
            substitutions: {
              '%title%': 'Your Conf Has Been Published!',
              '%message%': 'Thanks again for your submission. You rock!',
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
    code: 200,
    body: {}
  };
}

export default updateConference;
