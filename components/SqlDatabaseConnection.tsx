
import SQLite from 'react-native-sqlite-storage';
import { useSelector } from 'react-redux';


export const db = SQLite.openDatabase(
    {
        name: 'notes.db',
        location: 'default'
    },
    () => {
        console.log('Database opened Successfully');
    },
    (error) => {
        console.error('Error Opening Database', error);
    }
);


db.transaction((tx) => {
    tx.executeSql(
        `CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT
    );`,
        [],
        () => {
            console.log('Table created successfully');
        },
        (error) => {
            console.error('Error creating table', error);
        }

    )
}
);

const SendData = () => {
    const NotesData: any = useSelector((state: any) => state.reducer);
    db.transaction((tx) => {
        tx.executeSql(
            `insert into notes (title, description) values (?, ?)`,
            [NotesData.title, NotesData.description],
            () => {
                console.warn('Note added Successfully');
            },
            (error) => {
                console.error('Error adding Note', error);
            }
        );
    });
}


