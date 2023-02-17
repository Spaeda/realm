exports = async function (arg) {
  // Call notification endpoint
  const response = await context.http.post({
    url: `${context.values.get('apiUrl')}/notification`,
    body: arg.notification,
    encodeBodyAsJSON: true,
    headers: {
      Authorization: [`Bearer ${arg.token}`],
    },
  });
  if (response.statusCode !== 200) {
    console.error(response.body.text());
    return false;
  }

  return true;
};
