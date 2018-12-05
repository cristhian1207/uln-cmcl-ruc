require('./config/config.js');
const express = require('express');
const app = express();
app.use(require('./routes/sunat.js'));

app.listen(process.env.PORT, () => {
    console.log('Escuchando al puerto:', process.env.PORT);
});