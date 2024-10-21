const transformData = (rawData) => {
    // Transform raw data into meaningful metrics
    return rawData.map(item => ({
        id: item.id,
        name: item.name.toUpperCase(), // Example transformation
    }));
};

module.exports = { transformData };
