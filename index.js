// Packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');

// function will take in the answers object and convert it into the README.md file content
function generateLogo(answers) {
    return `
${answers.letters}

${answers.colour}

${answers.shape}
`;
}

// An array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'letters',
        message: 'What letters would you like on your logo? You may choose up to 3.',
        validate: function(value) {
            if (value.length <= 3) {
                return true;
            }
            return 'Please enter up to 3 characters only.';
        }
    },
    {
        type: 'input',
        name: 'colour',
        message: 'Please choose a colour using a hexadecimal number.',
    },
    {
        type: 'list',
        name: 'shape',
        message: 'Please choose a shape.',
        choices: ['circle', 'triangle', 'square'],
    },
];

// Function to write README file
function writeToFile(fileName, data) {
    fs.writeFile(fileName, data, (err) => {
        if (err) {
            return console.log(err);
        }
        console.log("Successfully created" + fileName);
    });
}

// Function to initialize app
function init() {
    inquirer.prompt(questions).then((answers) => {
        const logoContent = generateLogo(answers);
        writeToFile("logo.svg", logoContent);
    });
}

// Function call to initialize app
init();