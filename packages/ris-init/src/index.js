const inquirer = require('inquirer');
const path = require('path');
const spawn = require('cross-spawn');
const chalk = require('chalk');
const fs = require('fs');
const question = require('./prompt');
const util = require('./util');

let templateDir;

function replacer(_file, _answers) {
  const file = _file;
  const answers = _answers;
  if (/\.npmignore$/.test(file.path)) {
    file.path = file.path.replace('.npmignore', '.gitignore');
  }
  // replace package.json
  if (file.path === path.join(templateDir, 'package.json')) {
    const contents = JSON.parse(file.contents.toString());
    contents.name = answers.name;
    contents.version = answers.version;
    contents.author = answers.author;
    contents.description = answers.description;
    file.contents = Buffer.from(JSON.stringify(contents, null, 2));
  }
}

async function getDestDir(argument) {
  const destDir = path.join(process.cwd(), argument || '.');
  if (!argument) {
    const { ok } = await inquirer.prompt([{
      name: 'ok',
      type: 'confirm',
      message: 'Generate project in current directory?',
    }]);
    if (!ok) {
      process.exit(0);
    }
  } else if (fs.existsSync(destDir)) {
    console.log(`Target directory ${chalk.cyan(destDir)} already exists.`);
    process.exit(0);
  }
  return destDir;
}

async function genernate(answers, destDir) {
  const target = templateDir;
  const dest = destDir;
  try {
    if (!fs.existsSync(destDir)) {
      // destDir is not exists, create destDir
      fs.mkdirSync(destDir);
    }
    await util.copy(target, dest, (file) => {
      replacer(file, answers);
    });
  } catch (e) {
    console.log(e);
  }
}

async function installDependencies(command, destDir) {
  return new Promise((resolve, reject) => {
    const args = [
      'install',
      '--loglevel',
      'error',
    ];
    process.chdir(destDir);
    // Explicitly set cwd() to work around issues like
    // https://github.com/facebook/create-react-app/issues/3326.
    // Unfortunately we can only do this for Yarn because npm support for
    // equivalent --prefix flag doesn't help with this issue.
    // This is why for npm, we run checkThatNpmCanReadCwd() early instead.
    if (command === 'yarn') {
      args.push('--cwd');
      args.push(destDir);
    }
    const child = spawn(command, args, { stdio: 'inherit' });
    child.on('close', (code) => {
      if (code !== 0) {
        reject(args.join(''));
      }
      resolve();
    });
  });
}

function printProjectGuide(directory) {
  const displayedCommand = 'npm';
  console.log();
  console.log('Project initialization finished !');
  console.log();
  console.log('Inside that directory, you can run several commands:');
  console.log();
  console.log(chalk.cyan(`  ${displayedCommand} start`));
  console.log('    Starts the development server.');
  console.log();
  console.log(chalk.cyan(`  ${displayedCommand} run build`));
  console.log('    Bundles the app into static files for production.');
  console.log();
  console.log(chalk.cyan(`  ${displayedCommand} run deploy`));
  console.log('    Deploy static files to remote repository.');
  console.log();
  console.log('We suggest that you begin by typing: ');
  console.log();
  if (directory) {
    console.log(chalk.cyan('  cd'), directory);
  }
  console.log(`  ${chalk.cyan(`${displayedCommand} start`)}`);
  console.log();
}

module.exports = {
  async run(argument) {
    const directory = argument;
    const destDir = await getDestDir(directory);
    const answers = await inquirer.prompt(question({
      destDir,
    }));
    templateDir = path.join(__dirname, `../template/${answers.type}`);
    // genernate project
    console.log('# Genernate project file ...');
    await genernate(answers, destDir);
    console.log('# Genernate project finish.');

    // install project dependencies
    if (answers.installType) {
      console.log('# Installing dependencies. This might take a couple of minutes.');
      try {
        await installDependencies(answers.installType, destDir);
        // print guide
        printProjectGuide(directory);
      } catch (e) {
        console.log(chalk.red('# Install dependencies fail.'));
      }
    } else {
      printProjectGuide(directory);
    }
  },
};
