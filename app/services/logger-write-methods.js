const Logger = require('../services/logger_service')
const bodyParser = require('body-parser');
var datetime = new Date();
datetime=datetime.toISOString().slice(0,10);
const logger = new Logger(datetime);

exports.writeLogInfo= (request, logMsg) => {
    logger.setLogData(request.query);
    logger.info(logMsg);
}

exports.writeLogError= (error, errMsg) => {
    // logger.setLogData(request.query);
    logger.error(errMsg, error);
}