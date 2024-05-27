import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();


export const getAllBooks = async (req, res) => {
    try {
        const books = await prisma.book.findMany();
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get books', message: error.message });
    }
}

export const getBookDetails = async (req, res) => {
    const bookId = parseInt(req.params.id);
    try {
        const book = await prisma.book.findUnique({ where: { id: bookId } });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get book details', message: error.message });
    }
};