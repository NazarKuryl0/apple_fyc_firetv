export const convertShowRuntime = time => {
  const hour = Math.floor(time / 3600);
  const min = Math.round((time % 3600) / 60);
  const hDisplay = hour ? `${hour} hr ` : ``;
  const mDisplay = min ? `${min} min ` : ``;
  return hDisplay ? `${hDisplay} ${mDisplay}` : `${mDisplay}`;
};
