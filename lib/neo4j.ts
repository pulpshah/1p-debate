import neo4j, { Driver } from 'neo4j-driver';
import { GoogleProfile } from 'next-auth/providers/google';

// Use environment variables to get the Neo4j Aura connection details
const NEO4J_URI = process.env.NEO4J_URI ?? '';
const NEO4J_USERNAME = process.env.NEO4J_USERNAME ?? 'neo4j';
const NEO4J_PASSWORD = process.env.NEO4J_PASSWORD ?? '';


if (!NEO4J_URI || !NEO4J_USERNAME || !NEO4J_PASSWORD) {
    throw new Error('Missing Neo4j Aura connection environment variables');
}

export const driver: Driver = neo4j.driver(
    NEO4J_URI,
    neo4j.auth.basic(NEO4J_USERNAME, NEO4J_PASSWORD)
);

export const signUpOrLoginUser = async (profile: GoogleProfile) => {
  const session = driver.session();
  try {
    // Query to find the user by email
    const findUserQuery = `
      MATCH (u:User {email: $email})
      RETURN u
    `;

    const findResult = await session.run(findUserQuery, { email: profile.email });

    if (findResult.records.length > 0) {
      // User exists, return their details
      console.log('User found:', findResult.records[0].get('u').properties);
      return {
        status: 'login',
        user: findResult.records[0].get('u').properties,
      };
    } else {
      // User not found, create a new user
      const createUserQuery = `
        CREATE (u:User {
          username: $username,
          email: $email,
          image: $image
        })
        RETURN u
      `;

      const createResult = await session.run(createUserQuery, {
        username: profile.username,
        email: profile.email,
        image: profile.picture,
      });

      console.log('New user created:', createResult.records[0].get('u').properties);
      return {
        status: 'signup',
        user: createResult.records[0].get('u').properties,
      };
    }
  } catch (error) {
    console.error('Error in signUpOrLoginUser:', error);
    throw error;
  } finally {
    await session.close();
  }
};
