// Packages needed for this application
import inquirer from 'inquirer';
import fs from 'fs';
import { Triangle, Square, Circle } from './lib/shapes.js'; 

// Function to generate SVG content based on user input
function generateLogo(answers) {
    let shape;
    switch (answers.shape) {
        case 'triangle':
            shape = new Triangle();
            break;
        case 'square':
            shape = new Square();
            break;
        case 'circle':
            shape = new Circle();
            break;
        default:
            break;
    }

    shape.setColor(answers.shapeColour);
    
    const centroid = shape.getCentroid();

    const svgContent = `
        <svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">
            <g>
                ${shape.render()}
                <text x="${centroid.x}" y="${centroid.y}" text-anchor="middle" font-size="40" fill="${answers.textColour}">${answers.letters}</text>
            </g>
        </svg>
    `;

    return svgContent;
}

// ... [Rest of the code]


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
        name: 'textColour',
        message: 'Please choose a text colour or use a hexadecimal number.',
    },
    {
        type: 'input',
        name: 'shapeColour',
        message: 'Please choose a background colour or use a hexadecimal number.',
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