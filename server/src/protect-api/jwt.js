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
      `${api}/users/login`,

      `${api}/ratedmeals`,
      `${api}/ratings`,

      `${api}/orders/order`,
    ],
  });
}

// **expressJwt** offer a way to revoke one of the parameter passed in **jsonwebtoken**

async function isRevokedCallback(req, payload, done) {
  //is not Admin (role 1: customer)
  if (!payload.isAdmin) {
    done(null, true);
  }
  // is Admin (role 2: Administrator)
  done();
}

module.exports = requireAuthJwt;

// --> here we are i writed authenticated user => next move i have to **POST** order after this authentication (order-routes.js)
