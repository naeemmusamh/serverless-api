const dynamoose = require("dynamoose");
const PeopleSchema = require("./schema.js");

exports.handler = async(event) => {
    try {
        const id = event.pathParameters ? event.pathParameters.id : null;
        const { name } = JSON.parse(event.body);
        let items;
        if (id) {
            await PeopleSchema.update({
                id: id,
            }, {
                name: name,
            });
        } else {
            return "there no id was base in the path";
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