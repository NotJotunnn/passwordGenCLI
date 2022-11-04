// Simple npm package used to copy to clipboard!
import clipboardy from 'clipboardy';

// Gets Arguments used into code
const argsUsed = process.argv.slice(2);

// Validates each input and only returns useful ones
function argsValidation(value) {
    // Category A
    if(value.match(/[a,n,s,A]+@+[0-9]/g) != null) return [value.match(/[a,n,s,A]+@+[0-9]{1,3}/g)[0], 'a']

    // Category B
    else if(value.match(/[a,s,n,A]+/g) != null) return [value.match(/[a,s,n,A]+/g)[0], 'b']

    // Category C (only used at the end of the code!)
    else if(value.match(/[0-9]{1,3}/g) != null) return [value.match(/[0-9]{1,3}/g)[0], 'c']
    else return 'no result'
}

// Main
if(argsUsed.length != 0) {
    // All the numbers, symbols and letters used
    const arrs = [
        ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
        ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
        ['!', '@', '#', '$', '%', '&', '*', '-', '+', '?']
    ]
    
    // Array for when user specifies variable amounts
    const useXSpecific = []

    // Array for when user uses open arguments
    const useX = []

    // Useful arguments
    const validatedArgs = []
    
    // Checks each arguments for useful ones
    argsUsed.forEach(arg => {
        const value = argsValidation(arg)
        if(value != null && value != undefined && value != 'no result') validatedArgs.push(argsValidation(arg))
    });

    if(validatedArgs.length != 0) {

        validatedArgs.forEach(arg => {

            // It gets all validated arguments that join the category a (i.e.: The ones in which the users specified the amount)
            if(arg[1] == 'a') {
                const argsArr = arg[0].split('@', 2)
                
                if(argsArr[0] == 'a') {
                    for(var i = 0; i < Number(argsArr[1]); i++) {
                        const randomValue = Math.floor(Math.random() * arrs[0].length)

                        
                        if(argsArr[1] < 25) {
                            useXSpecific.push(arrs[0][randomValue])
                            arrs[0].splice(randomValue, 1)
                        }
                        else {
                            useX.push(arrs[0][randomValue].toUpperCase())
                        }
                    }
                }

                else if(argsArr[0] == 's') {
                    for(var i = 0; i < Number(argsArr[1]); i++) {
                        const randomValue = Math.floor(Math.random() * arrs[2].length)

                        
                        if(argsArr[1] < 10) {
                            useXSpecific.push(arrs[2][randomValue])
                            arrs[2].splice(randomValue, 1)
                        }
                        else {
                            useX.push(arrs[0][randomValue].toUpperCase())
                        }
                    }
                }

                else if(argsArr[0] == 'n') {
                    for(var i = 0; i < Number(argsArr[1]); i++) {
                        const randomValue = Math.floor(Math.random() * arrs[1].length)

                        
                        if(argsArr[1] < 10) {
                            useXSpecific.push(arrs[1][randomValue])
                            arrs[1].splice(randomValue, 1)
                        }
                        else {
                            useX.push(arrs[0][randomValue].toUpperCase())
                        }
                    }
                }

                else if(argsArr[0] == 'A') {
                    for(var i = 0; i < Number(argsArr[1]); i++) {
                        const randomValue = Math.floor(Math.random() * arrs[0].length)

                        
                        if(argsArr[1] < 25) {
                            useXSpecific.push(arrs[0][randomValue].toUpperCase())
                            arrs[0].splice(randomValue, 1)
                        }
                        else {
                            useX.push(arrs[0][randomValue].toUpperCase())
                        }
                    }
                }
            }

            // It gets all validated arguments that join the category b (i.e.: The ones in which the users did not specify amount)
            else if(arg[1] == 'b') {
                if(arg[0] == 'a') {
                    arrs[0].forEach(arr => {
                        useX.push(arr)
                    });
                }

                if(arg[0] == 'A') {
                    arrs[0].forEach(arr => {
                        useX.push(arr.toString().toUpperCase())
                    });
                }

                if(arg[0] == 'n') {
                    arrs[1].forEach(arr => {
                        useX.push(arr)
                    });
                }

                if(arg[0] == 's') {
                    arrs[2].forEach(arr => {
                        useX.push(arr)
                    });
                }
            }

        });
        
        // Future return value to user
        var passwordOutput = ''

        // Amount of characters defined by the user (default: 32)
        var characters = 0

        // Checks the size of the specified amount array and returns 0 if array is empty
        const size = useXSpecific.length > 0 ? useXSpecific.length : 0

        // Checks if there is the max amount setup, then it deducts from it using size previously declared, (if not declared, it defaults to 32)
        if(validatedArgs != 0) {
            validatedArgs.forEach(args => {
                if(args[1] == 'c') {
                    characters += Number(args[0]) - size
                }
            });
        }

        // This first condition checks if there are any specified values to prioritize, otherwise it moves on
        // If there is, then it goes from each one and adds randomly to a string
        if(useXSpecific.length > 0) {


            for(var i = 0; i < size; i++) {
                const randomValue = Math.floor(Math.random() * useXSpecific.length)
       
                passwordOutput += useXSpecific[randomValue]
                useXSpecific.splice(randomValue, 1)
            }
            console.log('Specified: ', passwordOutput)
        }

        // This second condition checks if there are any non-specified values to add up, otherwise it moves on
        // If there is, then it goes from each one and adds randomly to a string
        if(useX.length > 0) {
            
            for(var i = 0; i < (characters != 0 ? characters : characters = 32); i++) {
                const randomValue = Math.floor(Math.random() * useX.length)
       
                passwordOutput += useX[randomValue]
            }
            console.log('With randomized: ', passwordOutput)

            // Copies above value to clipboard!
            clipboardy.writeSync(passwordOutput)
        }
        console.log('Size: ', characters + size)

        // Validation
    } else console.log('Add working arguments')
} else console.log('Empty arguments')