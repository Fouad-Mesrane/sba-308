// The provided course information.
const CourseInfo = {
  id: 451,
  name: "Introduction to JavaScript",
};

// The provided assignment group.
const AssignmentGroup = {
  id: 12345,
  name: "Fundamentals of JavaScript",
  course_id: 451,
  group_weight: 25,
  assignments: [
    {
      id: 1,
      name: "Declare a Variable",
      due_at: "2023-01-25",
      points_possible: 50,
    },
    {
      id: 2,
      name: "Write a Function",
      due_at: "2023-02-27",
      points_possible: 150,
    },
    {
      id: 3,
      name: "Code the World",
      due_at: "3156-11-15",
      points_possible: 500,
    },
  ],
};

// The provided learner submission data.
const LearnerSubmissions = [
  {
    learner_id: 125,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-25",
      score: 47,
    },
  },
  {
    learner_id: 125,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-02-12",
      score: 150,
    },
  },
  {
    learner_id: 125,
    assignment_id: 3,
    submission: {
      submitted_at: "2023-01-25",
      score: 400,
    },
  },
  {
    learner_id: 132,
    assignment_id: 1,
    submission: {
      submitted_at: "2023-01-24",
      score: 39,
    },
  },
  {
    learner_id: 132,
    assignment_id: 2,
    submission: {
      submitted_at: "2023-03-07",
      score: 140,
    },
  },
];

function getLearnerData(course, ag, submissions) {
  // here, we would process this data to achieve the desired result.
  // const result = [
  //   {
  //     id: 125,
  //     avg: 0.985, // (47 + 150) / (50 + 150)
  //     1: 0.94, // 47 / 50
  //     2: 1.0 // 150 / 150
  //   },
  //   {
  //     id: 132,
  //     avg: 0.82, // (39 + 125) / (50 + 150)
  //     1: 0.78, // 39 / 50
  //     2: 0.833 // late: (140 - 15) / 150
  //   }
  // ];

  //
  // declare needed variables

  const result = [];
  // check to grab the correct course and course assignemnets
  if (course.id !== ag.course_id) {
    throw new Error("Please choose the correct course");
  }

  // validating the data is correct
  validateData(ag, submissions);

  // filtering assignements that are in the future

  const filteredAssignments = AssignmentGroup.assignments.filter(
    (assignment) => {
      const due_at = new Date(assignment.due_at);
      return due_at < new Date();
    }
  );

  // const groupedSubmissions = {}

  // LearnerSubmissions.forEach(submission => {
  //   const learner_id = submission.learner_id;
  //   if ()
  // })

  

  return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);

// helper functions

// a function to check data if it is valid

function validateData(ag, submissions) {
  const assignemnets = ag.assignments;
  assignemnets.forEach((assignment) => {
    if (
      typeof assignment.points_possible !== "number" ||
      assignment.points_possible <= 0
    ) {
      throw new Error(
        `Invalid points_possible for assignment ID ${assignment.id}`
      );
    }

    if (!assignment.due_at) {
      throw new Error(`Missing due date for assignment ID ${assignment.id}`);
    }
  });

  //validating learner data

  submissions.forEach((submission) => {
    if (
      !submission.learner_id ||
      !submission.assignment_id ||
      !submission.submission
    ) {
      throw new Error(
        `Invalid submission data for learner ${submission.learner_id}`
      );
    }
    if (typeof submission.submission.score !== "number") {
      throw new Error(
        `Score for learner ${submission.learner_id} must be a number`
      );
    }
  });
}
