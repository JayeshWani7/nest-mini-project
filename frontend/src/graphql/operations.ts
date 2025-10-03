import { gql } from '@apollo/client';

// User type definition
export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone?: string;
  bio?: string;
  gender?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedUsers {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  phone?: string;
  bio?: string;
  gender?: string;
}

// GraphQL Queries
export const GET_USERS = gql`
  query GetUsers($limit: Int, $page: Int, $search: String) {
    users(limit: $limit, page: $page, search: $search) {
      users {
        _id
        firstName
        lastName
        email
        age
        phone
        bio
        gender
        isActive
        createdAt
        updatedAt
      }
      total
      page
      limit
      totalPages
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      _id
      firstName
      lastName
      email
      age
      phone
      bio
      gender
      isActive
      createdAt
      updatedAt
    }
  }
`;

// GraphQL Mutations
export const CREATE_USER = gql`
  mutation CreateUser($input: CreateUserInput!) {
    createUser(createUserInput: $input) {
      _id
      firstName
      lastName
      email
      age
      phone
      bio
      gender
      isActive
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUserInput!) {
    updateUser(id: $id, updateUserInput: $input) {
      id
      firstName
      lastName
      email
      age
      phone
      bio
      gender
      isActive
      updatedAt
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    removeUser(id: $id) {
      id
      firstName
      lastName
      email
    }
  }
`;