export const generateId = (function () {
  let i = 0;

  return function (id?: string) {
    i += 1;

    return typeof id === "string" ? `${id}-${i}` : i.toString();
  };
})();
