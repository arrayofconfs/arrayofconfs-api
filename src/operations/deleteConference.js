import ConferenceModel from '../models/conferences';

async function deleteConference({
  body,
  headers,
  params,
  query
}) {
  const conferences = await ConferenceModel.findByIdAndDelete(
    params.conferenceId
  );
  
  return {
    code: 200,
    body: {}
  };
}

export default deleteConference;
