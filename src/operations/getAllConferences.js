import ConferenceModel from '../models/conferences';

async function getAllConferences({
  body,
  headers,
  params,
  query
}) {
  const filter = {};
  if (!query.showUnpublished) {
    filter.published = true;
  }
  
  const conferences = await ConferenceModel.find(filter);
  
  return {
    code: 200,
    body: {
      conferences: conferences.map((conference) => {
        const data = {
          id: conference.id,
          address: conference.address,
          attendUrl: conference.attendUrl,
          codeOfConduct: conference.codeOfConduct,
          cost: conference.cost,
          dates: conference.dates,
          description: conference.description,
          diversityScholarship: conference.diversityScholarship,
          latitude: conference.latitude,
          location: conference.location,
          longitude: conference.longitude,
          name: conference.name,
          speakerRegistration: conference.speakerRegistration,
          tags: conference.tags,
          twitter: conference.twitter,
          website: conference.website
        };
        if (query.showUnpublished) {
          data.authorEmail = conference.authorEmail;
          data.published = conference.published;
        }
        return data;
      })
    }
  };
}

export default getAllConferences;
