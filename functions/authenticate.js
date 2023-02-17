exports = async function () {
  /*********************************************************************
   * Authentication to IdentityServer with client credentials stored in App secret
   *********************************************************************/

  // Body for authentication service
  const body = [`grant_type=client_credentials`, `client_id=${context.values.get('clientId')}`, `client_secret=${context.values.get('clientSecret')}`].join('&');
  // Call connect token endpoint
  const response = await context.http.post({
    url: `${context.values.get('authenticationUrl')}/connect/token`,
    body: body,
    headers: {
      'Content-Type': ['application/x-www-form-urlencoded'],
    },
  });
  if (response.statusCode !== 200) {
    console.error(response.body.text());
    return { success: false };
  }
  const authResult = EJSON.parse(response.body.text());
  return { success: true, token: authResult.access_token };
};
