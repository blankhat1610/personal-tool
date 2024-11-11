import { Command } from 'commander';
import inquirer from 'inquirer';
import timeCost from '../utils/timeCost.js';

// Example function for demonstration
const enum_diff = (old_enum, new_enum) => {
  const old_enum_set = new Set(old_enum);
  const new_enum_set = new Set(new_enum);
  
  const added = [];
  const removed = [];
  
  new Set([...old_enum, ...new_enum]).forEach(enum_val => {
    if (!old_enum_set.has(enum_val)) {
      added.push(enum_val);
    } else if (!new_enum_set.has(enum_val)) {
      removed.push(enum_val);
    }
  });
  
  return { added, removed };
};

// Create the command
const enumDiffCommand = new Command('enumDiff')
    .description('Compare two enumerations and find differences')
    .option('--time', 'Measure execution time')
    .action(async (options) => {
        try {
            // Prompt the user for oldEnum and newEnum inputs
            const answers = await inquirer.prompt([
                {
                    type: 'editor',
                    name: 'oldEnum',
                    message: 'Enter the old enumeration (one per line):'
                },
                {
                    type: 'editor',
                    name: 'newEnum',
                    message: 'Enter the new enumeration (one per line):'
                }
            ]);

            const oldEnumArray = answers.oldEnum.split('\n').map(line => line.trim()).filter(line => line);
            const newEnumArray = answers.newEnum.split('\n').map(line => line.trim()).filter(line => line);

            let result, executionTime;
            if (options.time) {
                const timeCostResult = timeCost(() => enum_diff(oldEnumArray, newEnumArray));
                result = timeCostResult.result;
                executionTime = timeCostResult.executionTime;
            } else {
                result = enum_diff(oldEnumArray, newEnumArray);
            }

            console.log('========= RESULT =========');
            console.log('Added:', result.added);
            console.log('Removed:', result.removed);
            console.log('==========================');
            if (options.time) {
                console.log(`Execution time: ${executionTime} ms`);
                console.log('==========================');
            }
        } catch (error) {
            console.error('Error executing function:', error.message);
        }
    });

export default enumDiffCommand;
