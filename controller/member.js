const Member = require('../models/member');

class MemberController {
    static list(req, res) {
        Member
            .find({})
            .then(members => {
                res.status(200).json(members)
            })
            .catch(err => {
                res.status(500).json({ msg: err.message })
            })
    }

    static read(req, res) {
        Member
            .findById(req.params.id)
            .then(member => {
                if (member) {
                    res.status(200).json(member)
                } else {
                    res.status(404).json({ msg: 'Member not found'})
                }
            })
            .catch(err => {
                res.status(500).json({ msg: err.message })
            })
    }
    
    static add(req, res) {
        Member
            .create(req.body)
            .then(member => {
                res.status(201).json(member)
            })
            .catch(err => {
                if (err.name === 'ValidationError' || RegExp('Validation Error').test(err.message)) {
                    res.status(400).json({ msg: err.message })
                } else {
                    res.status(500).json({ msg: err.message })
                }
            })
    }

    static remove(req, res) {
        Member
            .deleteOne({ _id: req.params.id })
            .then(result => {
                if (result.ok === 1) {
                    res.status(200).json({ msg: 'Member deleted' })
                } else {
                    res.status(404).json({ msg: 'Member not found' })
                }
            })
            .catch(err => {
                res.status(500).json({ msg: err.message })
            })
    }

    static update(req, res) {
        Member
            .updateOne({ _id: req.params.id }, { $set: req.body })
            .then(result => {
                if (result.ok === 1) {
                    res.status(200).json({ msg: 'Member info updated' })
                } else {
                    res.status(404).json({ msg: 'Member not found' })
                }
            })
            .catch(err => {
                res.status(500).json({ msg: err.message })
            })
    }
}

module.exports = MemberController;