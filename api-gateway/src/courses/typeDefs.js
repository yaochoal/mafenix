export const coursesTypeDef = `
type Course {
    id: Int!
    name: String!
    description: String!
    code: Int!
    teacher_has_courses: [Teachers] 
    course_has_resources: [Resources]   
}
type Teachers{
    id: Int!
    teacher_id: Int!
    teacher_name: String!
    teacher_description: String!
    course_id: Int!
    course_name: String!
    course_description: String!
    course_code: Int!
}
input CourseInput {
    name: String!
    description: String!
    code: Int!
}`;

export const coursesQueries = `
    allCourses(page: Int!): [Course]!
    courseById(code: Int!): Course!
`;

export const coursesMutations = `
    createCourse(course: CourseInput!): Course!
    deleteCourse(code: Int!): Int
    updateCourse(code: Int!, course: CourseInput!): Course!
`;
