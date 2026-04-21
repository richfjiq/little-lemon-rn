import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabaseSync('little_lemon');

export async function createTable() {
  try {
    db.execSync(
      'create table if not exists menuitems (id integer primary key autoincrement, name text, price text, description text, image text, category text);',
    );
  } catch (error) {
    console.log('error +++++', error);
    // Handle error
    Alert.alert(e.message);
  }
}

export async function getMenuItems() {
  try {
    const allRows = db.getAllSync('SELECT * FROM menuitems;');
    return allRows;
  } catch (error) {
    console.log('error +++++', error);
    // Handle error
    Alert.alert(e.message);
  }
}

export function saveMenuItems(menuitems) {
  try {
    const statement = db.prepareSync(
      'insert into menuitems (name, price, description, image, category) values (?, ?, ?, ?, ?);',
    );
    menuitems.forEach((item) => {
      statement.executeSync(
        item.name,
        item.price,
        item.description,
        item.image,
        item.category,
      );
    });
  } catch (error) {
    console.log('error +++++', error);
    // Handle error
    Alert.alert(e.message);
  } finally {
    statement.finalizeSync();
  }
}
