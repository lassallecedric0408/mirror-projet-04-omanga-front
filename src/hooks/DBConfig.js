import Dexie from 'dexie';

const db = new Dexie('UserDataDB');
db.version(1).stores({
  userDataStore: '++id,username,email',
});

export const saveUserData = async (userData) => {
  try {
    await db.userDataStore.put(userData);
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement des données utilisateur :', error);
  }
};

export const readUserDataFromIndexedDB = async () => {
  try {
    const userData = await db.userDataStore.get(1); // Remplacez 1 par l'ID de l'utilisateur
    return userData || null;
  } catch (error) {
    console.error('Erreur lors de la lecture des données utilisateur depuis IndexedDB :', error);
    return null;
  }
};

export const deleteUserData = async () => {
  try {
    await db.userDataStore.clear(); // Cela effacera toutes les données utilisateur stockées
  } catch (error) {
    console.error('Erreur lors de la suppression des données utilisateur :', error);
  }
};