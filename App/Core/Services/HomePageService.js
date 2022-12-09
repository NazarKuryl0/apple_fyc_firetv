import client from './client';

function fetchHomePageData(isFYC) {
  return client.get(`/modules/placement/apple-${isFYC}-home/`);
}

export const homePageService = {
  fetchHomePageData,
};
