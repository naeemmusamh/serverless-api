const PeopleSchema = require("./schema.js");

exports.handler = async(event) => {
    try {
        const id = event.pathParameters ? event.pathParameters.id : null;
        let items;
        if (id) {
            items = await PeopleSchema.delete({ id });
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