












const acl = require(./auth/middleware/access-control);

//below not finished and 2 more routes
app.get('/create', bearerAuth, acl('create'), (req,res,next));
