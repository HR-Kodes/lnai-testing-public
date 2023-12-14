const { CosmosClient } = require('@azure/cosmos');

const endpoint = 'https://nikhiltemporary.documents.azure.com:443/';
const key = '2hnkaOgkXpkhSpoiAkejzgmQPho9J0F2nMXSfV4alkqUus1Qtb6UfY5wOwNf8cTO4oL88EDD5BmNACDbQXxFrQ==';

const client = new CosmosClient({ endpoint, key });

const databaseId = "FORMS";
const containerId = "SPICE A";

async function connectToCosmosDB() {
    const { database } = await client.databases.createIfNotExists({ id: databaseId });
    const { container } = await database.containers.createIfNotExists({ id: containerId });
    console.log("Cosmos DB connected");
}

module.exports = {
    connectToCosmosDB,
    client,
    databaseId,
    containerId
};
