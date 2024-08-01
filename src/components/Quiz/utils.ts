
export function isValidJSON(jsonString: string) {
  try {
    JSON.parse(jsonString);
    return true;
  } catch (error) {
    return false;
  }
}

const isNumString = (str: string) => !Number.isNaN(Number(str));

function deepParseJson(jsonString: string) {
  if (typeof jsonString === 'string') {
    if (isNumString(jsonString)) {
      return jsonString;
    }
    try {
      return deepParseJson(JSON.parse(jsonString));
    } catch (err) {
      return jsonString;
    }
  } else if (Array.isArray(jsonString)) {
    return (jsonString as any).map((val: any) => deepParseJson(val));
  } else if (typeof jsonString === 'object' && jsonString !== null) {
    return Object.keys(jsonString).reduce((obj, key) => {
      const val = jsonString[key];
      // eslint-disable-next-line no-param-reassign
      (obj as any)[key] = isNumString(val) ? val : deepParseJson(val);
      return obj;
    }, {});
  } else {
    return jsonString;
  }
}

export const prepareHeaders = () => {
  const rawPersistedData = localStorage.getItem('admin');

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');

  if (rawPersistedData) {
    const persistData = deepParseJson(rawPersistedData);
    const accessToken = persistData?.auth?.session?.token;
    headers.append('Authorization', 'Bearer  ' + accessToken);

    return headers;
  }

  return headers;
};
