let papaparse = require('papaparse.min');

let csv = {
    turnCsvToJson: function (csvname, callback) {
        let toJson = function (csvData) {
            let csvJson = {};
            for (let i = 1; i < csvData.length; ++i) {
                let rowJson = {};
                for (let j = 0; j < csvData[0].length; ++j) {
                    rowJson[csvData[0][j].trim()] = csvData[i][j];
                    csvJson[i] = rowJson;
                }
            }
            return csvJson;
        };

        cc.loader.loadRes(csvname, function (err, csvData) {
            if (err) {
                cc.error(err.message || err);
            } else {
                let jsData = papaparse.parse(csvData.text, {
                    complete: function (parsedCsv) {
                        callback(toJson(parsedCsv.data));
                    }
                });
            }
        });
    },

    getJsonLength(json) {
        let count = 0;
        for (let k in json) {
            if (json.hasOwnProperty(k)) {
                count++;
            }
        }
        return count;
    },
};

module.exports = csv;