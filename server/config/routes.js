var auth = require('./auth'),
    users = require('../controllers/users'),
    courses = require('../controllers/courses'),
    articles = require('../controllers/articles');

module.exports = function(app) {
  

  app.get('/api/users', auth.requiresRole('admin'), users.getUsers);  
  app.post('/api/users', users.createUser);
  app.put('/api/users', users.updateUser);

  app.get('/api/courses', courses.list);
  app.get('/api/courses/:id', courses.detail);

  app.get('/article/post', articles.list);
  app.get('/article/post/all', articles.listAll);
  app.get('/article/:id', articles.read);
  app.get('/tag/:tagName', articles.listByTag);
  app.get('/admin/article/post/:id', articles.adminRead);
  app.post('/article/post', articles.create);
  app.put('/article/post', articles.update);
  app.delete('/article/post/:id', articles.delete);

  app.get('/partials/*', function(req, res) {
    res.render('../../public/app/' + req.params);
  });

  app.post('/login', auth.authenticate);

  app.post('/logout', function (req, res) {
    req.logout();
    res.end();
  });
  
  app.all('/api/*', function (req, res) {    
    res.send(404);
  });

  app.get('*', function(req, res) {
    res.render('index',
      {
        bootstrappedUser: req.user
      });
  });
}