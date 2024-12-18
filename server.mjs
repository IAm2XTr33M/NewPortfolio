import express from 'express';
import path from 'path';
import DOMPurify from 'dompurify';
import { JSDOM } from 'jsdom';
import multer from 'multer';
import emailjs from '@emailjs/nodejs';

import axios from 'axios';

const upload = multer({ dest: 'uploads/' });
const app = express();
const PORT = process.env.PORT || 3000;
emailjs.init({
    publicKey: 'tw6p-iFyiyWPoKxGl',
    blockHeadless: true,
    limitRate: {
      id: 'app',
      throttle: 30000,
    },
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(process.cwd(), 'public'))); // Use process.cwd() instead of __dirname

const window = new JSDOM('').window;
const purify = DOMPurify(window);

app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'index.html')); // Use process.cwd() instead of __dirname
});

emailjs.init({
    publicKey: 'tw6p-iFyiyWPoKxGl',
    privateKey: 'V6mXNRnrKc2_rv9caoVWH',
  });

app.post('/submit', upload.single('fileFieldName'), (req, res) => {
    const { name, email, phone, message } = req.body;

    const cleanName = purify.sanitize(name);
    const cleanEmail = purify.sanitize(email);
    const cleanPhone = purify.sanitize(phone);
    const cleanMessage = purify.sanitize(message);

    var params = {
        from_name : cleanName,
        email_id : cleanEmail,
        phone_number : cleanPhone,
        message : cleanMessage,
    }
    console.log(params.from_name + " tried sending you an email");

    emailjs.send('service_0i0u84s', 'template_jnggw6k', params ).then(
        (response) => {
          console.log('SUCCESS!', response.status, response.text);
        },
        (err) => {
          console.log('FAILED...', err);
        },
      );
    res.send(
        "<h2>Form Submitted!</h2>"
    );
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});


const url = `https://portfolio-9a98.onrender.com`;
const interval = 60000; //1 min - 60 sec

function reloadWebsite() {
  axios.get(url)
    .then(response => {
      console.log(`Reloaded   at ${new Date().toISOString()}: Status Code ${response.status}`);
    })
    .catch(error => {
      console.error(`Error reloading at ${new Date().toISOString()}:`, error.message);
    });
}


setInterval(reloadWebsite, interval);
