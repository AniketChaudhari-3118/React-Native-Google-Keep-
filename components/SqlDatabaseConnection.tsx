
import SQLite from 'react-native-sqlite-storage';
import { useSelector } from 'react-redux';


export const db = SQLite.openDatabase(
    {
        name: 'NotesData.db',
        location: 'default'
    },
    () => {
        //console.warn('Database opened Successfully');
    },
    (error) => {
        console.error('Error Opening Database', error);
    }
);


db.transaction((tx) => {
    tx.executeSql(
        `CREATE TABLE IF NOT EXISTS notesdata (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT
    );`,
        [],
        () => {
            //Aniket@123console.warn('Table created successfully');
        },
        (error) => {
            console.error('Error creating table', error);
        }

    )
}
);
