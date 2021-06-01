const dynamoose = require("dynamoose");
const PeopleSchema = require("./schema.js");

//this function from the lambda function provide in AWS
exports.handler = async(event) => {
    try {
        const id = event.pathParameters ? event.pathParameters.id : null;
        let items;
        //if you search by id it will return for you one element
        //else it will return for you the all element
        if (id) {
            //eq() method returns an element with a specific index number of the selected elements
            //exec() This method returns the matched text if it finds a match, otherwise it returns null
            items = await PeopleSchema.query("id").eq(id).exec();
            items = items[0];
        } else {
            //scan() This method allows iterating over every occurrence of the given pattern
            items = await PeopleSchema.scan().exec();
        }
        return {
            statusCode: 200,
            body: JSON.stringify(items),
        };
    } catch (error) {
        return {
            statusCode: 500,
            error: error.message,
        };
    }
};