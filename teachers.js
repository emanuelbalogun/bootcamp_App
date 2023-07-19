const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'labber'
});


const cohort =process.argv[2];
const values =[`%${cohort}%`]
pool.query(`
SELECT distinct teachers.name teacher, cohorts.name cohort
FROM teachers 
JOIN assistance_requests 
ON teachers.id = assistance_requests.teacher_id
JOIN students ON students.id = assistance_requests.student_id
JOIN cohorts ON cohorts.id = students.cohort_id
where cohorts.name = $1
ORDER BY teacher`, values
)
.then(res => {
  res.rows.forEach(result => {
    console.log(`${result.cohort}: ${result.teacher}`);
  })
}).catch(err => console.log('query error', err.stack));