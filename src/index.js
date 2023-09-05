const app = require('./servidor');
const { router } = require('./controller/router/router');


app.use(router)


app.listen(3000);