### Sample Typescript Plugin

This is a sample plugin using typescript with sample query/mutation.
You can add new functionalities to it by following steps.

1. Add queries/mutations in the `schema.graphql` file in the respective folder.

   This means that, if you want to add a new query, you should go to `query/schema.graphql` file and add it there

2. Add resolvers for that in the `index.ts` file of the respective folder.

   This means that, if, for example, you want to add a new mutation (remember that you previously should have added the mutation in the `mutation/schema.graphql` file). You then should go to `mutation/index.ts` and implement that function inside of the `Mutation` class

3. Run `yarn build`

If you want to use helpers in both `mutation` and `query`, you can use the `common` folder to create the any helper function

Also, to see how you can interact/use the plugin, you can check the [test file](./src/__tests__/e2e.spec.ts) and run `yarn test`
