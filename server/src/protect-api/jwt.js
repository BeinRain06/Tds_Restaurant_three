// install and require npm **expressJwt** package
const { expressjwt: jwt } = require("express-jwt");

require("dotenv").config();

//purpose: protect our allowing quite change with the type of token of user admin
function requireAuthJwt() {
  const secret = process.env.secret;
  const api = process.env.API_BASE_URL;

  //question: where are cookies needed ?

  return jwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevokedCallback,
  }).unless({
    path: [
      { url: /\/api\/delivery\/meals(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/delivery\/categories(.*)/, methods: ["GET", "OPTIONS"] },

      {
        url: /\/api\/delivery\/orders(.*)/,
        methods: ["GET", "OPTIONS", "POST", "PUT"],
      },
      {
        url: /\/api\/delivery\/payments(.*)/,
        methods: ["GET", "POST"],
      },
      {
        url: /\/api\/delivery\/users\/register(.*)/,
        methods: ["POST", "PUT"],
      },
      {
        url: /\/api\/delivery\/ratings(.*)/,
        methods: ["GET", "OPTIONS", "POST", "PUT"],
      },
      `${api}/users/login`,

      `${api}/ratedmeals`,

      `${api}/orders/order`,
    ],
  });
}

//diffferents solution checking token
/* var token =
  req.cookies.access_token ||
  req.body.access_token ||
  req.query.access_token ||
  req.headers["x-access-token"]; */

// **expressJwt** offer a way to revoke one of the parameter passed in **jsonwebtoken**

async function isRevokedCallback(req, payload, done) {
  //here our token in cookies is named "token"
  var token =
    req.cookies.access_jwt_token ||
    req.body.access_jwt_token ||
    req.query.access_jwt_token ||
    req.headers["x-access-token"];

  if (!payload.isAdmin || token === undefined) {
    //is not Admin (role 1: customer) or token access not found
    done(null, true);
  } else if (payload.isAdmin) {
    // is Admin (role 2: Administrator)
    done();
  }
}

module.exports = requireAuthJwt;

// --> here we are i writed authenticated user => next move i have to **POST** order after this authentication (order-routes.js)
