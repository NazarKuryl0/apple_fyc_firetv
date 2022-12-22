import client from './client';

function fetchVideosSource(assetId) {
  return client.get(`/playback/stream/asset/${assetId}/`);
}

export const videoService = {fetchVideosSource};
