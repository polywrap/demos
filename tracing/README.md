# Tracing Demo
## How To Run
1. Install the Polywrap CLI
`nvm install && nvm use && yarn`

2. Start the tracing service:
`npx polywrap infra up --modules tracer`

3. Open the tracing UI:
Open - http://localhost:3301

4. Run the demo application:
`cd app && yarn && yarn build && yarn test`

5. View the trace logs from the Polywrap client:
View - http://localhost:3301
