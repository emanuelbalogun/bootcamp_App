const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'labber'
});
let arg = process.argv[2];
const limit = process.argv[3];
const cohort =process.argv[2];

pool.query(`
SELECT students.id as student_id, students.name as name, cohorts.name as cohort
FROM students
JOIN cohorts ON cohorts.id = cohort_id
WHERE cohorts.name LIKE '%${process.argv[2]}%'
LIMIT ${process.argv[3] || 5};
`)
.then(res => {
  res.rows.forEach(user => {
    console.log(`${user.name} has an id of ${user.student_id} and was in the ${user.cohort} cohort`);
  })
}).catch(err => console.error('query error', err.stack));