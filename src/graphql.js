import gql from 'graphql-tag';

export const ME_QUERY = gql`
  query Me {
    me {
      id
      email
      firstName
      middleName
      lastName
      gender
      dateOfBirth
    }
  }
`;

export const MY_PETS_QUERY = gql`
  query Mypets {
    me {
      id
      pets {
        items {
          id
          name
        }
      }
    }
  }
`;

export const MY_BUSINESS_QUERY = gql`
  query MyBusiness {
    me {
      id
      business {
        id
        name
        email
        website
        bio
        phone
      }
    }
  }
`;

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser(
    $id: ID!
    $email: String
    $firstName: String
    $middleName: String
    $lastName: String
    $gender: String
    $dateOfBirth: String
  ) {
    createUser(
      input: {
        id: $id
        email: $email
        firstName: $firstName
        middleName: $middleName
        lastName: $lastName
        gender: $gender
        dateOfBirth: $dateOfBirth
      }
    ) {
      id
    }
  }
`;

export const CREATE_PET_MUTATION = gql`
  mutation CreateCAR(
    $id: ID!
    $name: String
    $species: String
    $breed: String
    $dateOfBirth: String
  ) {
    createCAR(
      input: {
        id: $id
        name: $name
        species: $species
        breed: $breed
        dateOfBirth: $dateOfBirth
      }
    ) {
      id
    }
  }
`;

export const CREATE_BUSINESS_MUTATION = gql`
  mutation CreateBusiness(
    $id: ID!
    $name: String
    $email: String
    $website: String
    $bio: String
    $phone: String
  ) {
    createBusiness(
      input: {
        id: $id
        name: $name
        email: $email
        website: $website
        bio: $bio
        phone: $phone
      }
    ) {
      id
    }
  }
`;

export const DELETE_BUSINESS_MUTATION = gql`
  mutation DeleteBusiness($id: ID!) {
    deleteBusiness(input: { id: $id }) {
      id
    }
  }
`;
