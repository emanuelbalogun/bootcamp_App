const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'labber'
});


const cohort =process.argv[2];

pool.query(`
SELECT distinct teachers.name teacher, cohorts.name cohort
FROM teachers 
JOIN assistance_requests 
ON teachers.id = assistance_requests.teacher_id
JOIN students ON students.id = assistance_requests.student_id
JOIN cohorts ON cohorts.id = students.cohort_id
where cohorts.name ='${cohort}'
ORDER BY teacher`
)
.then(res => {
  res.rows.forEach(result => {
    console.log(`${result.cohort}: ${result.teacher}`);
  })
}).catch(err => console.error('query error', err.stack));