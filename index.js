const express = require('express')
const cors = require('cors')
const axios = require('axios')
const cheerio = require('cheerio')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')

const app = express()

app.use(bodyParser.json())
app.use(cors())
dotenv.config()

// URL
const URL = "https://truyen.tangthuvien.vn/"
const URL_TOP = 'https://truyen.tangthuvien.vn/tong-hop?rank=nm&time=m'
const URL_XEMNHIEU = 'https://truyen.tangthuvien.vn/tong-hop?rank=vw&time=m'
const URL_YEUTHICH = 'https://truyen.tangthuvien.vn/tong-hop?rank=yt'
const URL_THEODOI = 'https://truyen.tangthuvien.vn/tong-hop?rank=td'
const URL_ONE_BOOK = 'https://truyen.tangthuvien.vn/doc-truyen/'

// GET Data truyện mới
app.get('/cover/new', (req, resp) =>{
    const thumbnail = []
   try {
    axios(URL).then((res) =>{
        const html = res.data
        const $ = cheerio.load(html)
        $(".new-rec-wrap li", html).each(function(){
            const name = $(this).find('.book-img > a > img').attr('alt');
            const infor = $(this).find('.book-info > p').text().trim()
            const author = $(this).find('.state-box > .author').text()
            const category = $(this).find('.state-box > a > i').text()
            const image = $(this).find('.book-img > a > img').attr('src')
            const link = $(this).find('.book-img > a').attr('href')
            
            thumbnail.push({
                id: Math.floor(Math.random() * 100),
                name: name,
                infor: infor,
                author: author,
                category: category,
                image: image,
                link: link
            })
        })
        thumbnail.shift()
        resp.status(200).json(thumbnail)
    })
   
   } catch (error) {
    console.log(error)
   }
})

// GET data finish
app.get("/cover/finish", (req, resp) =>{
const data = []
   try {
    axios(URL).then((res) =>{
        const html = res.data;
        const $ = cheerio.load(html)
        $(".finish-book-wrap li", html).each(function(){
            const name = $(this).find('.book-img > a > img').attr('alt');
            const infor = $(this).find('.book-info > p').text().trim()
            const author = $(this).find('.state-box > .author').text()
            const category = $(this).find('.state-box > a > i').text()
            const image = $(this).find('.book-img > a > img').attr('src')
            const link = $(this).find('.book-img > a').attr('href')
            data.push({
                id: Math.floor(Math.random() * 100),
                name: name,
                infor: infor,
                author: author,
                category: category,
                image: image,
                link: link
            })
        })
        data.shift()
        resp.status(200).json(data)
    })
   } catch (error) {
    console.log(error)
   }
})

// GET data list book update
app.get("/cover/list", (req, resp) =>{
    const data = []
       try {
        axios(URL).then((res) =>{
            const html = res.data;
            const $ = cheerio.load(html)
            $(".update-list-wrap table tr", html).each(function(){
                const name = $(this).find('.name').text();
                const category = $(this).find('.classify').text();
                const chap = $(this).find('.section').text();
                const author = $(this).find('.author').text();
                const time = $(this).find('.respon > i').text();
                const link = $(this).find('.name').attr('href')
                data.push({
                    id: Math.floor(Math.random() * 100),
                    name: name,
                    category: category,
                    chap: chap,
                    author: author,
                    time: time,
                    link: link
                })
            })
            data.shift()
            resp.status(200).json(data)
        })
       } catch (error) {
        console.log(error)
       }
})

//  GET data recomend
app.get("/cover/recommend", (req, resp) =>{
    const data = []
       try {
        axios(URL).then((res) =>{
            const html = res.data;
            const $ = cheerio.load(html)
            $(".edit-rec-list li", html).each(function(){
                const name = $(this).find('h3').text();
                const chap = $(this).find('.total cite').text();
                const infor = $(this).find('p').text();
                const link = $(this).find('a').attr('href')
                data.push({
                    id: Math.floor(Math.random() * 100),
                    name: name,
                    chap: chap,
                    infor: infor,
                    link: link
                    
                })
            })
            data.shift()
            resp.status(200).json(data)
        })
       } catch (error) {
        console.log(error)
       }
})

// GET data top đề cử
app.get("/cover/list/dc", (req, resp) =>{
    const data = []
       try {
        axios(URL_TOP).then((res) =>{
            const html = res.data;
            const $ = cheerio.load(html)
            $(".book-img-text li", html).each(function(){
                const title = $(this).find(".book-mid-info > h4").text()
                const author = $(this).find(".book-mid-info .author .name").text().trim()
                const infor = $(this).find(".book-mid-info .intro").text()
                const update = $(this).find(".book-mid-info .update > span").text()
                const image = $(this).find('.book-img-box > a > img').attr('src')
                const chap = $(this).find(".book-mid-info .author .KIBoOgno").text()
                const link = $(this).find('.book-img-box > a').attr('href')
                data.push({
                    id: Math.floor(Math.random() * 100),
                    title: title,
                    author: author,
                    infor: infor,
                    update: update,
                    image: image,
                    chap: chap,
                    link: link
                })
            
            })
            
            resp.status(200).json(data)
        })
       } catch (error) {
        console.log(error)
       }
})

// GET data top xem nhiều
app.get("/cover/list/xn", (req, resp) =>{
    const data = []
       try {
        axios(URL_XEMNHIEU).then((res) =>{
            const html = res.data;
            const $ = cheerio.load(html)
            $(".book-img-text li", html).each(function(){
                const title = $(this).find(".book-mid-info > h4").text()
                const author = $(this).find(".book-mid-info .author .name").text().trim()
                const infor = $(this).find(".book-mid-info .intro").text()
                const update = $(this).find(".book-mid-info .update > span").text()
                const image = $(this).find('.book-img-box > a > img').attr('src')
                const chap = $(this).find(".book-mid-info .author .KIBoOgno").text()
                const link = $(this).find('.book-img-box > a').attr('href')
                data.push({
                    id: Math.floor(Math.random() * 100),
                    title: title,
                    author: author,
                    infor: infor,
                    update: update,
                    image: image,
                    chap: chap,
                    link: link
                })
            
            })
            
            resp.status(200).json(data)
        })
       } catch (error) {
        console.log(error)
       }
})

// GET data top Yêu thích
app.get("/cover/list/yt", (req, resp) =>{
    const data = []
       try {
        axios(URL_YEUTHICH).then((res) =>{
            const html = res.data;
            const $ = cheerio.load(html)
            $(".book-img-text li", html).each(function(){
                const title = $(this).find(".book-mid-info > h4").text()
                const author = $(this).find(".book-mid-info .author .name").text().trim()
                const infor = $(this).find(".book-mid-info .intro").text()
                const update = $(this).find(".book-mid-info .update > span").text()
                const image = $(this).find('.book-img-box > a > img').attr('src')
                const chap = $(this).find(".book-mid-info .author .KIBoOgno").text()
                const link = $(this).find('.book-img-box > a').attr('href')
                data.push({
                    id: Math.floor(Math.random() * 100),
                    title: title,
                    author: author,
                    infor: infor,
                    update: update,
                    image: image,
                    chap: chap,
                    link: link
                })
            
            })
            
            resp.status(200).json(data)
        })
       } catch (error) {
        console.log(error)
       }
})

// GET data top theo dõi nhiều
app.get("/cover/list/td", (req, resp) =>{
    const data = []
       try {
        axios(URL_THEODOI).then((res) =>{
            const html = res.data;
            const $ = cheerio.load(html)
            $(".book-img-text li", html).each(function(){
                const title = $(this).find(".book-mid-info > h4").text()
                const author = $(this).find(".book-mid-info .author .name").text().trim()
                const infor = $(this).find(".book-mid-info .intro").text()
                const update = $(this).find(".book-mid-info .update > span").text()
                const image = $(this).find('.book-img-box > a > img').attr('src')
                const chap = $(this).find(".book-mid-info .author .KIBoOgno").text()
                const link = $(this).find('.book-img-box > a').attr('href')
                data.push({
                    id: Math.floor(Math.random() * 100),
                    title: title,
                    author: author,
                    infor: infor,
                    update: update,
                    image: image,
                    chap: chap,
                    link: link
                })
            
            })
            
            resp.status(200).json(data)
        })
       } catch (error) {
        console.log(error)
       }
})

// GET data top coverter
app.get("/top/coventer", (req, resp) =>{
    const data = []
       try {
        axios(URL_THEODOI).then((res) =>{
            const html = res.data;
            const $ = cheerio.load(html)
            $(".update-rec-list ul li", html).each(function(){
                const top = $(this).find(".no").text()
                const number = $(this).find("span").text()
                const name = $(this).find("a").text()
                const link = $(this).find('a').attr('href')
                data.push({
                    id: top,
                    top: top,
                    number: number,
                    name: name,
                    link: link
                })
            
            })
            
            resp.status(200).json(data)
        })
       } catch (error) {
        console.log(error)
       }
})





app.listen(process.env.PORT || 3001, () => console.log('server runing'))