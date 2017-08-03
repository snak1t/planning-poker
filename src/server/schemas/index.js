const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');

const queryType = new GraphQLObjectType({
  name: 'QueryType',
  description: 'The root query type.',
  fields: {
    foo: {
      type: GraphQLString,
      args: {
        name: {
          type: GraphQLString
        }
      },
      resolve: (_, args, context) => {
        console.log(context);
        return Promise.resolve(args.name.toUpperCase());
      }
    },
    bar: {
      type: GraphQLString,
      resolve: () => Promise.resolve('Bar!!')
    }
  }
});

const schema = new GraphQLSchema({
  query: queryType
});

module.exports = {
  schema
};
