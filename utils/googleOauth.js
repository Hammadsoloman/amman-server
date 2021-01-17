const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(
  '858745528998-k25f4loe94h6do3urm348113um884es2.apps.googleusercontent.com',
  'zteEn8-Vwwe_vJXCSCL6p5sf',
  /**
   * To get access_token and refresh_token in server side,
   * the data for redirect_uri should be postmessage.
   * postmessage is magic value for redirect_uri to get credentials without actual redirect uri.
   */
  'postmessage'
);

exports.getProfileInfo = async (code) => {
  const r = await client.getToken(code);
  console.log('code in getProfileInfo',code)
  const idToken = r.tokens.id_token;
  console.log('idToken in getProfileInfo',idToken)

  const ticket = await client.verifyIdToken({
    idToken,
    audience:
      '858745528998-k25f4loe94h6do3urm348113um884es2.apps.googleusercontent.com',
  });
  console.log('ticket in getProfileInfo',ticket)


  const payload = ticket.getPayload();
  console.log('payload in getProfileInfo',payload)


  return payload;
};
