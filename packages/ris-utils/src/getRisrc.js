const path = require('path');
const fs = require('fs');
const defaultRc = require('./config/defaultRisrc');

module.exports = () => {
  const filePath = path.join(process.cwd(), 'tools/risrc.js');
  if (fs.existsSync(filePath)) {
    try {
      return require(filePath);
    } catch (e) {
      return defaultRc;
    }
  }
  return defaultRc;
};
