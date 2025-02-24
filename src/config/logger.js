const winston = require('winston');
const path = require('path');
const DailyRotateFile = require('winston-daily-rotate-file');

const logDir = path.join(__dirname, '..', 'logs'); // Caminho para a pasta de logs

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(), 
    new DailyRotateFile({
      dirname: logDir,               
      filename: 'server_logs-%DATE%.log', 
      datePattern: 'YYYY-MM-DD', 
      maxFiles: '30d',               
      zippedArchive: true,           
    }),
  ]
});

// Método para registrar alertas
logger.alert = function(message, meta) {
  this.warn(message, meta); 
};

module.exports = { logger };
