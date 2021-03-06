/* Amplify Params - DO NOT EDIT
	API_TODOAPPAMPLIFY_GRAPHQLAPIIDOUTPUT
	API_TODOAPPAMPLIFY_TODOCOUNTTABLE_ARN
	API_TODOAPPAMPLIFY_TODOCOUNTTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */ /**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */

const AWS = require("aws-sdk")
const docClient = new AWS.DynamoDB.DocumentClient()

exports.handler = async (event) => {
  if (event.Records[0].eventName != "INSERT") return

  const user = event.Records[0].dynamodb.NewImage.user.S
  const todoCount = event.Records.length

  console.log(user)
  console.log(todoCount)

  var params = {
    ExpressionAttributeValues: {
      ":this_user": user,
    },
    KeyConditionExpression: "userId = :this_user",
    ProjectionExpression: "id, userId, todoCount",
    FilterExpression: "contains (userId, :this_user)",
    TableName: process.env.API_TODOAPPAMPLIFY_TODOCOUNTTABLE_NAME,
  }

  const { Items } = await docClient.query(params).promise()
  console.log(Items)

  if (Items.length) {
    // update count
    console.log(Items)

    params = {
      Key: { id: Items[0].id },
      TableName: process.env.API_TODOAPPAMPLIFY_TODOCOUNTTABLE_NAME,
      UpdateExpression: "set todoCount = :r",
      ExpressionAttributeValues: {
        ":r": Items[0].todoCount + todoCount,
      },
    }

    await docClient.update(params).promise()
  } else {
    // add new record
    params = {
      TableName: process.env.API_TODOAPPAMPLIFY_TODOCOUNTTABLE_NAME,
      Item: {
        id: AWS.util.uuid.v4(),
        userId: user,
        todoCount: 1,
      },
    }

    const result = await docClient.put(params).promise()
    console.log(result)
  }

  return Promise.resolve("Done Trigger...")
}
