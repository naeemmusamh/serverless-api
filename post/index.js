const uuid = require("uuid").v4;
const PeopleSchema = require("./schema.js");

exports.handler = async(event) => {
    try {
        const id = uuid();
        const { name } = JSON.parse(event.body);
        let record = new PeopleSchema({ id, name });
        let newRecord = await record.save();
        return {
            statusCode: 201,
            body: JSON.stringify(newRecord),
        };
    } catch (err) {
        return {
            statusCode: 500,
            err: err.message,
        };
    }
};