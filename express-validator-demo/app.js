const express = require('express');
const app = express();
const {validationResult,check} = require('express-validator');

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/user',
    [
    check('username').isEmail().withMessage('username must be an email'),
    check('password').isLength({min:8}).withMessage('password must be at least 8 characters long')],
    (req,res)=>{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({
                errors: errors.array()
            });
        }else{
            res.send('success');
        }
    }
);

app.listen(3000, () => {
    console.log('Server started on port 3000');
});