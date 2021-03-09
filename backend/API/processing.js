const xlsx = require('xlsx');
const fs = require('fs');
// TODO: need data from backend (results from algo for allocations)

// TODO: convert to streaming write

class Processor {

    constructor(name = 'book') {
        this.workbook = xlsx.utils.book_new();
        this.name = name;
        this.ws = null;
    }

    createSheet(type = 'Allocations', data) {
        var data = [
            { name: 'Ouda', hours: 5},
            { name: 'Eagleson', hours: 10},
            { name: 'Grolinger', hours: 8}
        ]

        if (data) {
            this.ws = xlsx.utils.json_to_sheet(data);
            xlsx.utils.book_append_sheet(this.workbook, ws, type);
        }

        if (ws) {
            return xlsx.stream.to_csv(ws)
        } else {
            return null;
        }

    }
}

module.exports = Processor;