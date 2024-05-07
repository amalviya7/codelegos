/**
 * Fetches examples from the database asynchronously.
 * @returns {Promise<{id: number, name: string}[]>} An array of example objects
 */
export async function getExamplesFromDatabase() {
  // Implement your database access logic here
  return [
    { id: 1, name: 'Example 1' },
    { id: 2, name: 'Example 2' },
  ];
}
