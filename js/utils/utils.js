export const utils = {
  getQueryParameters:  queryParameter => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(queryParameter);
  }
}
