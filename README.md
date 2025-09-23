# TypeScript Dependency Analysis (LLM-assisted)


## This tool:
    - Scans TypeScript files in typescript-dependency-analysis-program/utils/.
    - Extracts all import / export ... from statements.
    - Sends a summary to Gemini via @google/genai.
    - Writes a Markdown report at ai-api/src/importAnalysis.md.

### .env is used for configuration .


## Install dependencies in project root Terminal:

    npm install @google/genai dotenv lodash uuid
    npm install -D typescript tsx @types/node


## In order to run:
    It needs an 'GEMINI_API_KEY', from 
    '.env file' created in the project directory


## To start, run one of the following commands:

    npm run analyze
    
 or equivalently
    
    npx tsx ./ai-api/src/main.ts


## Expected output:
    On success, the program creates/overwrites:
    
    - typescript-dependency-analysis-program/src/importAnalysis.md
    - LLM-written analysis with a dependency overview 
    - and recommendations.



