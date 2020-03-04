import express from 'express';

const router = express.Router();

router.get('/', function (req, res) {
    res.render('pages/index');
});

router.get('/deploy', function (req, res) {
    console.log('deploy')
    res.send('deploy');
});

router.get('/about', function (req, res) {
    res.render('pages/about');
});

export default router;