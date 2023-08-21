const fs = require('fs')
const express = require('express')

const app = express()
app.use(express.json())


const port = process.env.PORT || 1337
let books = []
let authors = []
let publishers = []

const loadBooks = () => {
    fs.readFile(__dirname + '/' + 'books.json', 'utf8', (err, data) => {
        books = JSON.parse(data)
    });
}

const loadAuthors = () => {
    fs.readFile(__dirname + '/' + 'authors.json', 'utf8', (err, data) => {
        authors = JSON.parse(data)
    });
}

const loadPublishers = () => {
    fs.readFile(__dirname + '/' + 'publishers.json', 'utf8', (err, data) => {
        publishers = JSON.parse(data)
    });
}

const GetBookById = (id) => {
    // Searching books for the id
    for (let book of books) {
        if (book.id === id) {
            return book
        }
    }
    return null
}

const GetAuthorById = (id) =>{
    // Searching author for the id
    for (let author of authors) {
        if (author.id === id) {
            return author
        }
    }
    return null
}

const GetPublisherById = (id) =>{
    // Searching publishers for the id
    for (let publisher of publishers) {
        if (publisher.id === id) {
            return publisher
        }
    }
    return null
}

loadBooks()
loadAuthors()
loadPublishers()

app.get('/book', (req, res) => {
    res.json(books);
})

app.get('/author', (req, res) => {
    res.json(authors);
})

app.get('/publisher', (req, res) => {
    res.json(publishers);
})

app.get('/book/:id', (req, res) => {
    // Reading id from the URL as string
    const id = parseInt(req.params.id)
    const book = GetBookById(id)
    if(book){
        res.json(book)
    }
    else{
        // Sending 404 when not found something is a good practice
        res.status(404).send('Book not found');
    }
})

app.get('/book/:id/author', (req, res) => {    
    // Reading id from the URL as string
    const id = parseInt(req.params.id)
    const book = GetBookById(id);    
    if(book){
        const author = GetAuthorById(book.author_id)
        if(author){
            res.json(author)
        }
        else{
            // Sending 404 when not found something is a good practice
            res.status(404).send('Author not found');
        }
    }
    else{
        // Sending 404 when not found something is a good practice
        res.status(404).send('Book not found');
    }
})

app.get('/book/:id/publisher', (req, res) => {    // Reading id from the URL as string
    const id = parseInt(req.params.id)
    const book = GetBookById(id);    
    if(book){
        const publisher = GetPublisherById(book.publisher_id)
        if(publisher){
            res.json(publisher)
        }
        else{
            // Sending 404 when not found something is a good practice
            res.status(404).send('Publisher not found');
        }
    }
    else{
        // Sending 404 when not found something is a good practice
        res.status(404).send('Book not found');
    }
})

app.get('/author/:id', (req, res) => {
    // Reading id from the URL as string
    const id = parseInt(req.params.id)
    const author = GetAuthorById(id)
    if(author){
        res.json(author)
    }
    else{
        // Sending 404 when not found something is a good practice
        res.status(404).send('Author not found');
    }
})

app.get('/author/:id/books', (req, res) => {
    // Reading id from the URL as string
    const id = parseInt(req.params.id)
    const author = GetAuthorById(id)
    if(author){
        const authorBooks = []
        author.books.forEach(b => {
            const book = GetBookById(b.book_id)
            if(book){
                authorBooks.push(book)
            }
        });
        if(authorBooks.length > 0){
            res.json(authorBooks)
        }
        else{
            res.status(404).send('Books by the author not found');
        }
    }
    else{
        // Sending 404 when not found something is a good practice
        res.status(404).send('Author not found');
    }
})

app.get('/publisher/:id', (req, res) => {
    // Reading id from the URL as string
    const id = parseInt(req.params.id)
    const publisher = GetPublisherById(id)
    if(publisher){
        res.json(publisher)
    }
    else{
        // Sending 404 when not found something is a good practice
        res.status(404).send('Publisher not found');
    }
})

app.get('/publisher/:id/books', (req, res) => {
    // Reading id from the URL as string
    const id = parseInt(req.params.id)
    const publisher = GetPublisherById(id)
    if(publisher){
        const publisherBooks = []
        publisher.books.forEach(b => {
            const book = GetBookById(b.book_id)
            if(book){
                publisherBooks.push(book)
            }
        });
        if(publisherBooks.length > 0){
            res.json(publisherBooks)
        }
        else{
            res.status(404).send('Books by the publisher not found');
        }
    }
    else{
        // Sending 404 when not found something is a good practice
        res.status(404).send('Publisher not found');
    }
})

app.listen(port, () => 
  console.log(`Server listening on port ${port}`)
)