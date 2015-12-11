# ParseReactStarter

This is an template application that contains all the setup work for a React application hosted on Parse.

## Getting Started

Install the node dependencies

    npm install
    
Copy and edit config.js

    cp config.js.example config.js
    vi config.js
    
Run the application (hosted locally)

    gulp
    
## Deploying the application

To deploy, you'll need to configure the Parse CLI with [these instructions](https://parse.com/docs/cloudcode/guide#command-line).

Then you'll be able to simply do 

    gulp build
    parse deploy