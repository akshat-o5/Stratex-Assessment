import { PrismaClient } from "@prisma/client";
import csvParser from "csv-parser";
import fs, { appendFile } from "fs";
import util from "util";

const prisma = new PrismaClient();
const unlinkFile = util.promisify(fs.unlink);

export const uploadBooksCSV = async (req, res) => {
    const sellerId = parseInt(req.user.userId);    // Get seller ID from authenticated user
    if (!sellerId) {
        console.log('Authenticated user:', req.user.id); // Log the user object for debugging
        return res.status(401).json({ error: 'Seller ID not found in authenticated user' });
    }
    console.log('Authenticated user ID:', sellerId); // Log the seller ID for debugging
    const filePath = req.file.path; // Get uploaded file path
    try {
        const books = await new Promise((resolve, reject) => {
            const results = [];
            fs.createReadStream(filePath) // Read the CSV file
                .pipe(csvParser())
                .on('data', (row) => {
                    // Map CSV fields to book object
                    results.push({
                        title: row.title,
                        author: row.author,
                        publishedDate: new Date(row.publishedDate), // Parse the date
                        price: parseFloat(row.price),
                        sellerId: sellerId
                    });
                })
                .on('end', () => resolve(results))
                .on('error', (error) => reject(error));
        });
        // Log books to check if sellerId is correctly assigned
        console.log('Books to be inserted:', books);
        // Insert books into database
        await prisma.book.createMany({ data: books });
        // Clean up the uploaded file
        await unlinkFile(filePath);
        res.status(201).json({ message: 'Books uploaded successfully' }); // Send success response
    } catch (error) {
        // Clean up the uploaded file in case of error
        await unlinkFile(filePath);
        res.status(400).json({ error: 'CSV upload failed', message: error.message }); // Handle errors
    }
};



export const getBooks = async (req, res) => {
    const sellerId = parseInt(req.user.userId);    // Get seller ID from authenticated user
    if (!sellerId) {
        return res.status(401).json({ error: 'Seller ID not found in authenticated user' });
    }
    try {
        const books = await prisma.book.findMany({ where: { sellerId } });
        res.status(200).json(books);
    } catch (error) {
        res.status(500).json({ error: 'Failed to get books', message: error.message });
    }
};



export const editBook = async (req, res) => {
    const sellerId = parseInt(req.user.userId);    // Get seller ID from authenticated user
    const bookId = parseInt(req.params.id);
    const { title, author, publishedDate, price } = req.body;
    if (!sellerId) {
        return res.status(401).json({ error: 'Seller ID not found in authenticated user' });
    }
    try {
        const book = await prisma.book.update({
            where: { id: bookId },
            data: { title, author, publishedDate, price: parseFloat(price), sellerId }
        });
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: 'Failed to edit book', message: error.message });
    }
};


export const deleteBook = async (req, res) => {
    const sellerId = req.user.userId; // Get seller ID from authenticated user
    const bookId = parseInt(req.params.id, 10); // Get book ID from request params
    try {
        const book = await prisma.book.findUnique({ where: { id: bookId } }); // Find book by ID

        if (book && book.sellerId === sellerId) { // Check if book belongs to seller
            await prisma.book.delete({ where: { id: bookId } }); // Delete the book
            res.json({ message: 'Book deleted successfully' }); // Send success response
        } else {
            res.status(403).json({ error: 'You cannot delete this book' }); // Handle unauthorized access
        }
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete book', message: error.message }); // Handle errors
    }
};   