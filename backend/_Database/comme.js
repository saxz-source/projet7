/*

db-migrate create seed --config ./config/dev.json

db-migrate create add-people --sql-file

  db.createTable('users', {
    id: { type: 'int', primaryKey: true, autoIncrement: true },
    email: {type: "string", notNull : true},
    firstName : {type: "string", notNull : true},
    lastName : {type : "string", notNull:true},
    password : {type: "string", notNull : true},
    fullName : {type : "string", notNull:true},
    role : {type : "string", notNull:true},

*/