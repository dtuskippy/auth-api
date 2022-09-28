'use strict';

//curried the capability
module.exports = (capability) => (req, res, next) => {
  try {
    console.log('from acl middleware', req.user);
    if(req.user.capabilities.includes(capability)){
      next();
    } next('Access Denied');
  } catch (e) {
    next('Invalid ACL Login');
  }
};

