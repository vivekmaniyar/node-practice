import fetch from 'node-fetch';

async function getData() {
    const response = await fetch('https://www.googleapis.com/books/v1/volumes/eq9XvgAACAAJ');
    const data = await response.json();
    console.log(data.volumeInfo);
}

getData();