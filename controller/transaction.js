const Transaction = require('../models/transaction');

class TransactionController {
    static list(req, res) {
        let where = {};
        if (req.query.bookId) {
            where = {
                booklist: req.query.bookId
            }
        }
        Transaction
            .find(where)
            .populate('member')
            .populate('booklist')
            .then(transactions => {
                res.status(200).json(transactions)
            })
            .catch(err => {
                res.status(500).json({ msg: err.message })
            })
    }

    static read(req, res) {
        Transaction
            .findById(req.params.id)
            .populate('member')
            .populate('booklist')
            .then(transaction => {
                if (transaction) {
                    res.status(200).json(transaction)
                } else {
                    res.status(404).json({ msg: 'Transaction not found'})
                }
            })
            .catch(err => {
                res.status(500).json({ msg: err.message })
            })
    }

    static add(req, res) {
        Transaction
            .create(req.body)
            .then(transaction => {
                res.status(201).json(transaction)
            })
            .catch(err => {
                res.status(500).json({ msg: err.message })
            })
    }

    static remove(req, res) {
        Transaction
            .deleteOne({ _id: req.params.id })
            .then(result => {
                if (result.ok === 1) {
                    res.status(200).json({ msg: 'Transaction deleted' })
                } else {
                    res.status(404).json({ msg: 'Transaction not found' })
                }
            })
            .catch(err => {
                res.status(500).json({ msg: err.message})
            })
    }

    static update(req, res) {
        Transaction
            .updateOne({ _id: req.params.id }, { $set: req.body })
            .then(result => {
                if (result.ok === 1) {
                    res.status(200).json({ msg: 'Transaction updated' })
                } else {
                    res.status(404).json({ msg: 'Transaction not found' })
                }
            })
            .catch(err => {
                res.status(500).json({ msg: err.message })
            })
    }
}

module.exports = TransactionController;