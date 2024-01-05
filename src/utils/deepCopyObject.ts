const deepCopyObject = (obj: { [key: string]: unknown }) => {
  return JSON.parse(JSON.stringify(obj));
};

export default deepCopyObject;
