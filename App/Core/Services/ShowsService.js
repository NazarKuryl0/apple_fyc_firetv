import client from './client';

function fetchShowDetails(slug) {
  return client({
    method: 'GET',
    url: `/avails/titles/${slug}/detail/`,
  });
}

function fetchShowSeasons(slug) {
  return client({
    method: 'GET',
    url: `/inventory/${slug}/seasons/`,
  });
}

function fetchSeasonEpisodes(id) {
  return client({
    method: 'GET',
    url: `/inventory/${id}/episodes/`,
  });
}

export const showsService = {
  fetchShowDetails,
  fetchShowSeasons,
  fetchSeasonEpisodes,
};
