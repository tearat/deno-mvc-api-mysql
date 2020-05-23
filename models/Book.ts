import client from '../service/mysql.ts';


const Book = {
    all: async () => {
        const result = await client.execute(`SELECT * FROM books`)
        return result.rows
    },
    get: async (isbn: string) => {
        const result = await client.execute(`SELECT * FROM books WHERE isbn = ?`, [isbn])
        if (result && result.rows) {
            return result.rows[0]
        } else {
            return false
        }
    },
    insert: async (isbn?: string, title?: string, author?: string) => {
        await client.execute(`INSERT INTO books (isbn, title, author) values (?, ?, ?)`, [ isbn, title, author ])
    },
    update: async (isbn?: string, title?: string, author?: string) => {
        await client.execute(`UPDATE books SET title = ?, author = ? WHERE isbn = ?`, [ isbn, title, author ])
    },
    destroy: async (isbn?: string) => {
        await client.execute(`DELETE FROM books WHERE isbn = ?`, [ isbn ])
    },
}

export { Book }
