const mongoose = require('mongoose');
const { Schema } = mongoose;

const transactionSchema = new Schema({
    member: {
        type: Schema.Types.ObjectId,
        ref: 'Member'
    },
    in_date: Date,
    out_date: Date,
    due_date: Date,
    fine: Number,
    booklist: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }]
});

transactionSchema.pre('save', function(next) {
    const t2 = this.in_date.getTime();
    const t1 = this.due_date.getTime();
    const daysDiff = parseInt((t2-t1)/(24*3600*1000))
    if (daysDiff > 0) {
        this.fine = daysDiff * 1000;
    }
    next()
})

let Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;