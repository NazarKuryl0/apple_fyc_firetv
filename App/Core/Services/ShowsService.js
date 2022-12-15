import client from './client';

function fetchShowDetails(slug) {
  return client({
    method: 'GET',
    url: `/avails/titles/${slug}/detail/`,
  });
}

export const showsService = {
  fetchShowDetails,
};
