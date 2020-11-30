let express = require('express');
let app = express();
let test = 'yoyo'
let timer = 0;
let x

const data = {name:'danjo',
    hobbies:['打游戏', 'WC-MP', 'skirpaderp'],
    test, timer, x
}
setTimer()
function setTimer(){
let x = setInterval(function() {
        
          timer++
    }, 999)
}

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
//   res.render('index', {foo: 'FOO'});
res.render('index', {data:data});
});

app.listen(4000, () => console.log('Example app listening on port 4000!'));