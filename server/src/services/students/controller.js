const students = require("../../models/student");
const response = require("../util/response");

const getStudentsList = async (req, res) => {
  //For pagination
  let page = req.query.page ? Number(req.query.page) : 1;
  let limit = req.query.limit ? Number(req.query.limit) : 1000000;
  //For filters
  let where = {};
  if (req.query.name) where.name = {$regex: req.query.name,$options: 'i'};
  if (req.query.rollNumber) where.rollNumber = {$regex: req.query.rollNumber,$options: 'i'};
  if (req.query.branch) where.branch = req.query.branch;
  if (req.query.section) where.section = req.query.section;

  //For sorting
  let sort = {};
  if (req.query.orderBy && req.query.order)
    sort[req.query.orderBy] = req.query.order;
  else sort = { name: "asc" };

  try {
    result = await students
      .find(where)
      .skip((page - 1) * limit)
      .limit(limit)
      .sort(sort);
    const total = await students.count(where);
    res.json(
      response({ data: result, total: total }, process.env.SUCCESS_CODE)
    );
  } catch (error) {
    res.json(
      response(
        { message: "Student data fetch error" },
        process.env.FAILURE_CODE
      )
    );
  }
};

const uploadStudentsList = async(req,res)=>{
  try{
    for ( let i = 0; i<req.body.length;i++){
      let data = req.body[i];
      console.log(data)
      let value = await students.findOne({rollNumber:data.rollNumber})
      console.log(value)
      if(!value){
        console.log(data)
        let newStudent = students(data)
        await newStudent.save()
      }
    }
    res.json(response({message:"Students added successfully"},process.env.SUCCESS_CODE))

  }catch(error){
    console.log(error);
    res.json(response({message:"Internal Server Error"}, process.env.SUCCESS_CODE));
  }
  

};

module.exports = {getStudentsList, uploadStudentsList}