const { MongoClient } = require('mongodb');

const dummyEmployee = {
  firstname: 'Alfonso',
  lastname: 'Guy',
};

const connectDB = async () => {
  const client = new MongoClient(process.env.DATABASE_URI);

  try {
    await client.connect();
    await listEmployees(client);
    // await createEmployee(client, dummyEmployee);
  } catch (error) {
    console.log(error);
  }
  //  finally {
  //   await client.close();
  // }
};

const listDatabases = async (client) => {
  const dbList = await client.db().admin().listDatabases();

  console.log('Databases:');
  dbList.databases.forEach((db) => console.log(` - ${db.name}`));
};

const listEmployees = async (client) => {
  const cursor = await client.db('CompanyDB').collection('employees').find({});

  for await (const employee of cursor) {
    console.log(employee);
  }
};

const createEmployee = async (client, employee) => {
  const result = await client
    .db('CompanyDB')
    .collection('employees')
    .insertOne(employee);
  console.log(
    `New employee created with the following id: ${result.insertedId}`
  );
};

module.exports = connectDB;
