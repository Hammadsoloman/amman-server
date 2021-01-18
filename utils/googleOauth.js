const { OAuth2Client } = require('google-auth-library');
const userModel = require('../lib/models/user/users-model')
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

const getProfileInfo = async (req,res,next) => {
  // function authSignIn (req,res,next){
    console.log('req.body in getProfileInfo',req.body)
    const NewCode=req.body['code']
    console.log('NewCode in getProfileInfo',NewCode)

  const r = await client.getToken(NewCode);
  console.log('r in getProfileInfo',r)
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
  // let user = payload['name'];
  let user = payload.name;

  console.log('user in payload',user)

  userModel.authenticateOAuth(user)
  .then(result =>{
    console.log('result in getProfileInfo',result)

    req.token = userModel.generateTokenOAuth(result[0]);
    console.log('req.token in getProfileInfo',req.token)

    next();
  })
  .catch(err=>{
    console.log('the error in bearer is ',err);
    next('Your Input is uncorrect');
  });
  
  // let token = jwt.sign({username: payload.name, role:user.role },SECRET,{
  //   expiresIn: '1d',
  // });
  // console.log('token in generate token')
  // return token;

};

module.exports = getProfileInfo;

