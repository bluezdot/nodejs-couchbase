var couchbase = require('couchbase')

async function main() {
  
  // Parameters
  const clusterConn = 'couchbase://localhost';
  const username = 'bluedot';
  const password = '123456';
  const bucketName = 'travel-sample';
  console.log("[i] SETUP PARAMETERS SUCCESSSFULLY");

  const cluster = await couchbase.connect(
    clusterConn,
    {
      username: username,
      password: password,
      timeouts: {
        kvTimeout: 10000, // milliseconds
      },
    }
  )
  console.log("[i] CONNECT SUCCESSFULLY!");

  const bucket = cluster.bucket(bucketName);
  const collection = bucket.scope('tenant_agent_00').collection('users')
  const user = {
  name: "Phạm Thanh Trường",
  addresses: [
    {
      type: "Chung cư",
      address: "Vinhomes Westpoint W2",
      city: "Hà nội",
      country: "Việt Nam"
    },
    {
      type: "Làm việc",
      address: "Indochina Plaza",
      city: "Hà nội",
      country: "Việt Nam"
    }
  ],
  driving_licence: "8d3931b5-51c5-58c8-9cf7-bc8ce90495581",
  passport: "95bfb372-04e8-5865-9331-d3ec66ca631b1",
  preferred_email: "labidien2001@gmail.com",
  preferred_phone: "0869886357",
  preferred_airline: "inventory.airline.airline_26071",
  preferred_airport: "inventory.airport.airport_5071",
  credit_cards: [
    {
      type: "Thẻ ngân hàng",
      number: "03721239001",
      expiration: "Vô hạn"
    },
    {
      type: "Visa1",
      number: "49862582279268661",
      expiration: "2021-071"
    }
  ],
  created: "2020-10-201",
  updated: "2021-02-191"
  }
  // Thêm document
  await collection.upsert('2', user)
  console.log("[i] UPSERT THÀNH CÔNG VÔ DATABASE \n");

  // Check kết quả
  let getResult = await collection.get('2')
  console.log('Thử xem upsert thành công chưa nà: ', getResult, "\n")

  // Query thử 
  const queryResult = await bucket
    .scope('inventory')
    .query('SELECT name FROM `airline` WHERE country=$1 LIMIT 10', {
      parameters: ['United States'],
    })
  console.log('Query Results:')
  queryResult.rows.forEach((row) => {
    console.log(row)
  })
  console.log("[i] PERFORM A N1QL QUERY SUCCESSFULLY \n")
}


// Chạy main -> Bắt lỗi nếu có -> Exit
main().catch((err) => {
    console.log('ERR:', err)
    process.exit(1)
  })
  .then(process.exit)
console.log("[i] End main!")