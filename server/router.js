const controllers = require('./controllers');
const mid = require('./middleware');

const router = (app) => {
    app.get('/getToken', mid.requiresSecure, controllers.Account.getToken);
    app.get('/getMons', mid.requiresLogin, controllers.Mon.getMons);

    app.get('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
    app.post('/login', mid.requiresSecure, mid.requiresLogout, controllers.Account.login);

    app.post('/signup', mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);

    app.get('/logout', mid.requiresLogin, controllers.Account.logout);

    app.get('/maker', mid.requiresLogin, controllers.Mon.makerPage);
    app.post('/maker', mid.requiresLogin, controllers.Mon.makeMon);
    app.post('/update', mid.requiresLogin, controllers.Mon.changeMon);
    app.post('/pay', mid.requiresLogin, controllers.Money.payCost);
    app.get('/start', mid.requiresLogin, controllers.Money.start);
    
    app.get('/', mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
};

module.exports = router;