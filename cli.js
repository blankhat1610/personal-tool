import { Command } from 'commander';
import inquirer from 'inquirer';
import enumDiffCommand from './commands/enumDiff.js';

const program = new Command();

// Register commands
program.addCommand(enumDiffCommand);

// Function to display the interactive menu
const displayMenu = async () => {
  const choices = [
    { name: 'Compare Enumerations (enumDiff)', value: 'enumDiff' },
    { name: 'View CLI Options and Tools', value: 'help' },
    { name: 'Exit', value: 'exit' }
  ];

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'command',
      message: 'Choose a command to perform:',
      choices
    }
  ]);

  return answers.command;
};

// Function to display the help menu
const displayHelpMenu = async () => {
  const choices = [
    { name: 'Help for Compare Enumerations (enumDiff)', value: 'enumDiffHelp' },
    { name: 'Back to Main Menu', value: 'back' }
  ];

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'command',
      message: 'Choose a tool to view options and descriptions:',
      choices
    }
  ]);

  return answers.command;
};

// Main function to run the CLI
const runCLI = async () => {
  let command;
  do {
    command = await displayMenu();
    switch (command) {
      case 'enumDiff':
        await program.parseAsync(['node', 'cli.js', 'enumDiff']);
        break;
      case 'help':
        let helpCommand;
        do {
          helpCommand = await displayHelpMenu();
          switch (helpCommand) {
            case 'enumDiffHelp':
              await program.parseAsync(['node', 'cli.js', 'enumDiff', '--help']);
              break;
            case 'back':
              break;
            default:
              console.log('Unknown command');
          }
        } while (helpCommand !== 'back');
        break;
      case 'exit':
        console.log('Exiting...');
        break;
      default:
        console.log('Unknown command');
    }
  } while (command !== 'exit');
};

runCLI();
