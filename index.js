const express = require("express");
const connection = require("./dbConnect")
const app = express()
const port = 8000
app.use(express.json())
// http methods
//get post put patch delete

// get for home screen
app.get('/',(req, res)=>{
    res.send("Hi From Home Page!");
})

app.get('/viewemployees', (req, res) => {
    let query = "SELECT * FROM employee_details";
    connection.query(query, function (err, result) {
        if (err) {
            console.log("Error", err.message);
            return res.status(500).send({ error: err.message });
        }
        res.send(result);
    });
});

// get employee by id
app.get('/viewemployee/:id', (req, res) => {
    const id = req.params.id;
    let query = "SELECT * FROM employee_details WHERE emp_id = ?";
    connection.query(query, [id], function (err, result) {
        if (err) {
            console.log("Error", err.message);
            return res.status(500).send({ error: err.message });
        }
        res.send(result);
    }); 
});

// post data
app.post("/addemployee", (req, res) =>{
    let query = "insert into employee_details set ?";
    let data = req.body;
            connection.query(query, data, function(err, result){
                if(err){
                    console.log("Error", err.message);
                }
                else{
                    // console.log(result)
                    res.send(result);
                }
            })
})

// patch
app.patch('/updatesalary/:eid',(req,res) =>{
    let query = "update employee_details set salary=? where emp_id = ?";
    let data = [req.body.salary ,req.params.eid]
        connection.query(query, data, function(err,result){
            if(err){
                console.log("Error", err.message)
            }
            else{
                res.send(result)
            }
        })
})

// delete by emp_id
app.delete('/deleteemployee/:id', (req,res) =>{
    const id = req.params.id;
    let  query = "delete from employee_details where emp_id = ?"
     connection.query(query, [id], function (err, result) {
        if (err) {
            console.log("Error", err.message);
            return res.status(500).send({ error: err.message });
        }
        res.send(result);
    });
})

// put

app.put('/setemployee/:eid',(req,res)=>{
    let query = "UPDATE employee_details SET employee_name = ?, dept_name = ?,salary = ?,join_date = ?, email = ?, status = ? WHERE emp_id = ?";
    let data = [req.body.employee_name, req.body.dept_name, req.body.salary, req.body.join_date,req.body.email, req.body.status ,req.params.eid]
        connection.query(query, data, function(err,result){
            if(err){
                console.log("Error", err.message)
            }
            else{
                res.send(result)
            }
        })
})

app.listen(port, ()=>{
    console.log(`Server started at port ${port}`)
})