const Book = require('../models/book');

class BookController {
    static list(req, res) {
        let field = {};
        if (req.query.keyWord) {
            field = {
                $or: [
                    {
                        author: {
                            $regex: req.query.keyWord,
                            $options: 'i'
                        }
                    },
                    {
                        title: {
                            $regex: req.query.keyWord,
                            $options: 'i'
                        }
                    }]
            }
        }
        Book
            .find(field)
            .then(books => {
                res.status(200).json(books)
            })
            .catch(err => {
                res.status(500).json({ msg: err.message })
            })
    }

    static read(req, res) {
        Book
            .findById(req.params.id)
            .then(book => {
                if (book) {
                    res.status(200).json(book);
                } else {
                    res.status(404).json({ msg: 'Book not found' });
                }
            })
            .catch(err => {
                res.status(500).json({ msg: err.message })
            })
    }

    static add(req, res) {
        Book
            .create(req.body)
            .then(book => {
                res.status(201).json(book)
            })
            .catch(err => {
                res.status(500).json({ msg: err.message })
            })
    }

    static remove(req, res) {
        Book
            .deleteOne({ _id: req.params.id })
            .then(result => {
                if (result.ok === 1) {
                    res.status(200).json({ msg: 'Book deleted' })
                } else {
                    res.status(404).json({ msg: 'Book not found' })
                }
            })
            .catch(err => {
                res.status(500).json({ msg: err.message })
            })
    }

    static update(req, res) {
        Book
            .updateOne({ _id: req.params.id }, { $set: req.body })
            .then(result => {
                if (result.ok === 1) {
                    res.status(200).json({ msg: 'Book updated' })
                } else {
                    res.status(404).json({ msg: 'Book not found' })
                }
            })
            .catch(err => {
                res.status(500).json({ msg: err.message })
            })
    }
}

module.exports = BookController;