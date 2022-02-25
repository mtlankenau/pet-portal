import { gql } from "@apollo/client";

export const SIGNUP = gql`
  mutation signup(
    $username: String!
    $email: String!
    $password: String!
    $firstName: String!
    $lastName: String!
    $phoneNumber: String!
  ) {
    signup(
      username: $username
      email: $email
      password: $password
      firstName: $firstName
      lastName: $lastName
      phoneNumber: $phoneNumber
    ) {
      token
      user {
        _id
        username
        email
        firstName
        lastName
        phoneNumber
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
      user {
        username
        email
      }
    }
  }
`;
