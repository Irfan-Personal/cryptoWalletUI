import { RequestPropertyValue } from '../../interfaces/network.interface';

export function mockGetRequest(
  delay: number,
  data: Record<string, RequestPropertyValue>,
  shouldFail: boolean,
  failType: string
) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      shouldFail ? reject('fail') : resolve(data);
    }, delay);
  })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      return {
        type: failType,
        response: err,
      };
    });
}

function getErrorFromErrorCode(errorCode: number) {
  const errorCodesEnabled = true;

  if ((!errorCode || !errorCodesEnabled) && errorCode !== 0) {
    return;
  }

  switch (errorCode) {
    case 0: // General error
      return 'add localization for error messages!';
  }
}

export function getFormattedHttpReqError(error: any) {
  const errorFormat =
    error?.status || error?.data?.errorCode || error?.errorCode;
  const errorFromErrorCode = getErrorFromErrorCode(errorFormat);
  if (errorFromErrorCode) {
    return errorFromErrorCode;
  } else if (error?.data?.errors) {
    const errorsInfoObj = error.data.errors;

    return Object.entries(errorsInfoObj).map(
      ([key, value]) => `${key}: ${value}`
    );
  } else if (error?.data?.errors?.description) {
    return error.data.errors.description;
  } else if (error?.data?.message) {
    return error.data.message;
  } else {
    return error?.statusText || error?.toString();
  }
}

export function insertParamsValueInUrl(
  url: string,
  data?: Record<string, RequestPropertyValue>
) {
  if (!data) return url;

  const paramKeys = url.match(/:[A-Za-z]+/g);

  if (paramKeys?.length) {
    return paramKeys
      .map((key) => key.replace(':', ''))
      .reduce((result, key) => {
        if (data[key]) {
          const formattedUrl = result.replace(`:${key}`, data[key]);
          delete data[key];

          return formattedUrl;
        }

        return result.replace(`:${key}`, '');
      }, url);
  }

  return url;
}
