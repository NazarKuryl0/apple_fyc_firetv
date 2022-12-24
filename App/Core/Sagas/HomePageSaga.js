import {put, call, select} from 'redux-saga/effects';

import {SHOW_LOADER, HIDE_LOADER} from '../Store/Common/Actions';
import {
  FETCH_HOME_PAGE_DATA_FAILED,
  FETCH_HOME_PAGE_DATA_SUCCESS,
} from '../Store/HomePage/Actions';
import {homePageService} from '../Services/HomePageService';
import {FYC, PRESS} from '../../Shared/Constants';

export function* fetchHomePageData() {
  yield put({
    type: SHOW_LOADER,
  });
  const {
    client: {isFYCContent},
  } = yield select();
  const {data} = yield call(() =>
    homePageService.fetchHomePageData(
      isFYCContent ? FYC.toLowerCase() : PRESS.toLowerCase(),
    ),
  );
  if (!data.success) {
    yield put({
      type: FETCH_HOME_PAGE_DATA_FAILED,
      payload: data.message,
    });
  } else {
    const filteredData = data.data.filter(
      item => item.module.type === 'title_grid' && item.module.content.length,
    );
    const dataToDisplay = filteredData.map(item => {
      return {
        name: item.module.display_name,
        content: item.module.content,
      };
    });
    dataToDisplay.sort((a, b) => {
      if (!isFYCContent) {
        return a.name > b.name ? -1 : 1;
      } else {
        return a.name < b.name ? -1 : 1;
      }
    });
    const dataToDisplayWithIndexing = dataToDisplay.map(
      (category, categoryIndex) => {
        const contentWithIndex = category.content.map((item, index) => {
          return {
            ...item,
            index: `${categoryIndex}${index}`,
          };
        });
        return {
          ...category,
          content: contentWithIndex,
        };
      },
    );

    let allContent = [];
    dataToDisplayWithIndexing.forEach(item => {
      item.content.forEach(show => {
        allContent.push(show);
      });
    });
    let allGenres = [];
    allContent.forEach(show => {
      show.genres.forEach(genre => {
        if (!allGenres.includes(genre)) {
          allGenres.push(genre);
        }
      });
    });
    let dataToDisplayWithGenres = [];
    allGenres.forEach(genre => {
      let showsWithGenre = allContent.filter(show =>
        show.genres.includes(genre),
      );
      dataToDisplayWithGenres.push({
        genre,
        content: showsWithGenre,
      });
    });

    yield put({
      type: FETCH_HOME_PAGE_DATA_SUCCESS,
      payload: {
        dataToDisplayWithIndexing,
        dataToDisplayWithGenres,
      },
    });
  }
  yield put({
    type: HIDE_LOADER,
  });
}
