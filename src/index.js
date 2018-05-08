import expressApp from './app';

const port = process.env.PORT || 3000;
expressApp.listen(port, () => console.log(`App listening on port ${port}!`));