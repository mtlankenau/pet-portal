// import the graphQL template function
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    firstName: String
    lastName: String
    phoneNumber: String
    pets: [Pet]
    petCount: Int
  }

  type Pet {
    _id: ID
    name: String
    type: String
    breed: String
    birthday: String
    createdAt: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    users: [User]
    user(username: String!): User
    allPets: [Pet]
    petsByOwner(username: String!): [Pet]
    petsByBreed(breed: String!): [Pet]
    petById(_id: ID!): Pet
  }

  type Mutation {
    signup(
      username: String!,
      email: String!,
      password: String!
      firstName: String!,
      lastName: String!,
      phoneNumber: String!
    ): Auth
    login(username: String!, password: String!): Auth
    addPet(
      name: String!,
      type: String!,
      breed: String!,
      birthday: String!
    ): Pet
    removePet(username: String!, petId: ID!): Pet
  }
`;

module.exports = typeDefs;