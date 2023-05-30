import express from 'express';

const port = 5000;

const app = express();

app.get('/', (req, res) => {
    res.send('API is running...');
});

app.get('/api/products', (req, res) => {

})

app.get('/api/product/:id', (req, res) => {
    
})

app.listen(port, () => console.log(`Server corriendo en puerto ${port}`));