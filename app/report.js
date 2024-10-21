const { transformData } = require('./etl');
const { createObjectCsvWriter } = require('csv-writer');

app.get('/api/report/csv', async (req, res) => {
    const transformedData = transformData(leads);
    const csvWriter = createObjectCsvWriter({
        path: 'report.csv',
        header: [
            { id: 'id', title: 'ID' },
            { id: 'name', title: 'NAME' },
        ],
    });

    await csvWriter.writeRecords(transformedData);
    res.download('report.csv');
});
