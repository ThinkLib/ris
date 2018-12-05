const path = require('path');
const { getNpms } = require('@ris/utils');

const npmChoices = getNpms().map(npm => ({
  name: `Yes, use ${npm}`,
  value: npm,
}));

module.exports = (options) => {
  const questions = [{
    name: 'name',
    type: 'input',
    message: 'Project name',
    default: path.basename(options.destDir),
  },
  {
    name: 'type',
    type: 'list',
    message: 'Project type',
    choices: [
      {
        name: 'simple - Empty react project',
        value: 'simple',
      },
      {
        name: 'standard - Project that integrated standard solutions',
        value: 'standard',
      },
    ],
  },
  {
    name: 'description',
    type: 'input',
    message: 'Project description',
    default: 'A React App Project',
  },
  {
    name: 'version',
    type: 'input',
    message: 'Project version',
    default: '1.0.0',
  },
  {
    name: 'author',
    type: 'input',
    message: 'Author',
    default: process.env.USER || process.env.USERNAME || '',
  },
  {
    name: 'installType',
    type: 'list',
    message: 'Should we install packages after the project created?',
    choices: [
      ...npmChoices,
      {
        name: 'Yes, use yarn',
        value: 'yarn',
      },
      {
        name: 'No, I will handle that myself',
        value: '',
      },
    ],
  }];
  return questions;
};
