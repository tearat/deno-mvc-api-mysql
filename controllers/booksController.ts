import client from '../service/mysql.ts';
import { Book } from '../models/Book.ts';

const getBooks = async ({ response }: { response: any }) => {
    const books = await Book.all()
    response.body = books
}

const getBook = async ({ params, response }: { params: { isbn: string }; response: any }) => {
    const book = await Book.get(params.isbn)
    if (book) {
        response.status = 200
        response.body = book
    } else {
        response.status = 404
        response.body = { message: `Book not found.` }
    }
}

const addBook = async ({ request, response }: { request: any; response: any }) => {
    const body = await request.body()
    Book.insert(body.value.isbn, body.value.title, body.value.author)
    response.body = { message: 'OK' }
    response.status = 200
}

const updateBook = async ({ params, request, response }: { params: { isbn: string }; request: any; response: any }) => {
    const book = await Book.get(params.isbn)
    if (book) {
        const body = await request.body()
        const updateInfos: { title?: string; author?: string } = body.value
        Book.update(updateInfos.title, updateInfos.author, params.isbn)
        response.body = { message: 'OK' }
        response.status = 200
    } else {
        response.status = 404
        response.body = { message: `Book not found` }
    }
}

const deleteBook = async ({ params, response }: { params: { isbn: string }; response: any }) => {
    const book = await Book.get(params.isbn)
    if (book) {
        Book.destroy(params.isbn)
        response.body = { message: 'OK' }
        response.status = 200
    } else {
        response.status = 404
        response.body = { message: `Book not found` }
    }
}

export { getBooks, getBook, addBook, updateBook, deleteBook }
