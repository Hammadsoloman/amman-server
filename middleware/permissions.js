module.exports = (capability) => {
    return (req, res, next) => {
      
      const authorization ={
        'admin':['admin','read', 'create', 'update'], 
        'user':['read', 'create'],
      };
      try {
        console.log('authorization (capability)',authorization[req.user.role],(capability));
        if (authorization[req.user.role].includes(capability)) {
          next();
        } else {
          next('you are not authorized to access!');
        }
      } catch (e) {
        next('Invalid Login');
      }
    };
  };