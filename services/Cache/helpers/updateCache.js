const updateCache = (operation, proxy, data, { target, query, variables }) => {
  const cache = proxy.readQuery({
    query,
    variables,
  });

  let payload = {
    ...cache,
  };

  /**
   * Update the cache based on operation type.
   */

  switch (operation) {
    case "insert":
      payload[target] = [...cache[target], data];

      break;
    case "erase":
      payload[target] = payload[target].filter((item) => item._id !== data._id);

      break;
  }

  /**
   * Write the new data to the Apollo cache.
   */

  proxy.writeQuery({
    query,
    variables,
    data: payload,
  });
};

export default updateCache;
