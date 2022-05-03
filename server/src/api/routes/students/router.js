const router = require("express").Router();
const checkRole = require("../../../services/util/checkRole");
const controller = require("../../../services/students/controller");

// GET STUDENTS
router.get("/", controller.getStudentsList);

router.post("/uploadStudentsList", controller.uploadStudentsList);
router.put(
  "/editStudent",
  (req, res, next) => {
    checkRole(req, res, next, ["ADMIN"]);
  },
  controller.editStudent
);

router.post("/fetchStudents", controller.fetchStudents);

router.post("/studentViewCard", controller.studentViewCard);
router.post(
  "/deleteStudent",
  (req, res, next) => {
    checkRole(req, res, next, ["ADMIN"]);
  },
  controller.deleteStudent
);
router.post("/generatePDF", controller.generatePDF);

module.exports = router;
