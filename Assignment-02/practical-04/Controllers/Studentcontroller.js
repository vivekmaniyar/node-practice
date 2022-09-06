const Student = require('../models/student');

module.exports.get_all_students = (req, res) => {
    Student.find({}, (err, students) => {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            if (!students) {
                res.json({ success: false, message: 'No students found' });
            } else {
                res.render('student', { students: students });
            }
        }
    });
};

module.exports.get_student_details = (req, res) => {
    Student.findOne({ _id: req.params.id }, (err, student) => {
        if (err) {
            res.json({ success: false, message: 'Not a valid student id' });
        } else {
            if (!student) {
                res.json({ success: false, message: 'Student not found' });
            } else {
                res.json({ success: true, student: student });
            }
        }
    });
};

module.exports.add_student_page = (req, res) => {
    res.render('addstudent');
};

module.exports.add_student = (req, res) => {
    let student = new Student({
        name: req.body.name,
        email: req.body.email,
        class: req.body.class,
        semester: req.body.semester
    });
    student.save((err) => {
        if (err) {
            res.json({ success: false, message: 'Could not save student. Error: ', err });
        } else {
            res.json({ success: true, message: 'Student saved!' });
        }
    });
};

module.exports.update_student_page = (req, res) => {
    Student.findOne({ _id: req.params.id }, (err, student) => {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            if (!student) {
                res.json({ success: false, message: 'No student found' });
            } else {
                res.render('updatestudent', { student: student });
            }
        }
    });
};

module.exports.update_student = (req, res) => {
    Student.findOne({ _id: req.params.id }, (err, student) => {
        if (err) {
            res.json({ success: false, message: 'Not a valid student id' });
        } else {
            if (!student) {
                res.json({ success: false, message: 'Student not found' });
            } else {
                student.name = req.body.name;
                student.email = req.body.email;
                student.class = req.body.class;
                student.semester = req.body.semester;
                student.save((err) => {
                    if (err) {
                        res.json({ success: false, message: 'Could not save student. Error: ', err });
                    } else {
                        res.json({ success: true, message: 'Student saved!' });
                    }
                });
            }
        }
    });
};

module.exports.delete_student_page = (req, res) => {
    Student.findOne({ _id: req.params.id }, (err, student) => {
        if (err) {
            res.json({ success: false, message: err });
        } else {
            if (!student) {
                res.json({ success: false, message: 'No student found' });
            } else {
                res.render('deletestudent', { student: student });
            }
        }
    });
};

module.exports.delete_student = (req, res) => {
    Student.findOne({ _id: req.params.id }, (err, student) => {
        if (err) {
            res.json({ success: false, message: 'Not a valid student id' });
        } else {
            if (!student) {
                res.json({ success: false, message: 'Student not found' });
            } else {
                student.remove((err) => {
                    if (err) {
                        res.json({ success: false, message: err });
                    } else {
                        res.json({ success: true, message: 'Student deleted!' });
                    }
                });
            }
        }
    });
};