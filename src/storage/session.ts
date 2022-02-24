import moment from "moment";

export type SessionKeyType =
  | number
  | "address"
  | "loggedIn"
  | "tokenData"
  | "loginToken";

export const setItem = (key: SessionKeyType, item: any, ttl = 3600) => {
  const expires = moment().unix() + ttl;
  sessionStorage.setItem(
    String(key),
    JSON.stringify({
      expires,
      data: item,
    }),
  );
};

export const getItem = (key: SessionKeyType): any => {
  const item = sessionStorage.getItem(String(key));
  if (!item) {
    return null;
  }

  const deserializedItem = JSON.parse(item);
  if (!deserializedItem) {
    return null;
  }

  if (
    !deserializedItem.hasOwnProperty("expires") ||
    !deserializedItem.hasOwnProperty("data")
  ) {
    return null;
  }

  const expired = moment().unix() >= deserializedItem.expires;
  if (expired) {
    sessionStorage.removeItem(String(key));
    return null;
  }

  return deserializedItem.data;
};

export const removeItem = (key: SessionKeyType) =>
  sessionStorage.removeItem(String(key));
