// const _ = require("lodash")
// const { ApolloServer, gql, GraphQLUpload } = require('apollo-server-express');

// const path = require("path")
// const fs = require("fs")
// const { Stream } = require("stream");
// const { parseArgs } = require("util");
// const resolvers = {
//   FileUpload: GraphQLUpload,
//     Query: {
//       hello: () => "Hello, world",
//     },
//     Mutation: {
//       UploadFile: async (parent, {file}) => {
//         const { createReadStream, filename, mimetype,  encoding } = await file
//         const pathName = path.join(__dirname, `/public/image/${filename}`)
//         await Stream.pipe(fs.createReadStream(pathName))
//         return {
//           url:`http://localhost:8000/public/image/${filename}`
//         }

//         },
//       },
    
//   };

//   module.exports = { resolvers };