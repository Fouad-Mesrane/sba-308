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
  const result = [];

  // Check that the course id matches
  if (course.id !== ag.course_id) {
    throw new Error("Please choose the correct course");
  }

  function calculatePercentage(score, pointsPossible) {
    if (pointsPossible <= 0) throw new Error("Points possible cannot be zero.");
    return score / pointsPossible;
  }

  // Process submissions grouped by learner
  const learners = {};

  for (const submission of submissions) {
    const {
      learner_id,
      assignment_id,
      submission: { submitted_at, score },
    } = submission;

    // Find the corresponding assignment
    const assignment = ag.assignments.find((a) => a.id === assignment_id);
    if (!assignment) continue;

    const due_at = new Date(assignment.due_at);
    const submittedDate = new Date(submitted_at);

    // Skip assignment if it's not due yet
    if (due_at > new Date()) continue;

    let finalScore = score;

    // If the submission is late, deduct 10% of the total points
    if (submittedDate > due_at) {
      finalScore -= assignment.points_possible * 0.1;
    }

    // Calculate the percentage for the assignment
    const percentage = calculatePercentage(
      finalScore,
      assignment.points_possible
    );

    // Organize learner data
    if (!learners[learner_id]) {
      learners[learner_id] = {
        id: learner_id,
        avg: 0,
        totalScore: 0,
        totalPoints: 0,
      };
    }

    // Store the percentage for the specific assignment by assignment_id
    learners[learner_id][assignment_id] = percentage;

    // Accumulate total scores and points for avg calculation later
    learners[learner_id].totalScore += finalScore;
    learners[learner_id].totalPoints += assignment.points_possible;
  }

  // calculate the average and build the result array
  for (let key in learners) {
    const learner = learners[key];

    // Avoid dividing by zero and calculate the weighted average
    if (learner.totalPoints > 0) {
      learner.avg = learner.totalScore / learner.totalPoints;
    }

    // Clean up the learner object by removing totalScore and totalPoints
    delete learner.totalScore;
    delete learner.totalPoints;

    // Push the learner data to the result array
    result.push(learner);
  }

  return result;
}

const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

console.log(result);
