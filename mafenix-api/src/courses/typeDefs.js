export const coursesTypeDef = `
type Course {
    id: Int!
    name: String!
    description: String!
    code: Int!
    teacher_has_courses: [Teacher_has_courses]
    course_has_resources: [Courses_has_resources]   
}
type Teacher_has_courses{
    id: Int!
    teacher_id: Int!
    teacher_name: String!
    teacher_description: String!
    course_id: Int!
    course_name: String!
    course_description: String!
    course_code: Int!
}
type Courses_has_resources{
    id: Int!
    resource_id: Int!
    resource_name: String!
    resource_description: String!
    resource_link: String!
    course_id: Int!
    course_name: String!
    course_description: String!
    course_code: Int!
}

input CourseInput {
    name: String!
    description: String!
    code: Int!
}
input CourseSearch {
    course_name: String!
}`;

export const coursesQueries = `
    allCourses(page: Int!): [Course]!
    allCourses1: [Course]!
    courseById(id: Int!): Course!
    courseByName(course: CourseSearch!): [Course]!
`;

export const coursesMutations = `
    createCourse(course: CourseInput!): Course!
    deleteCourse(id: Int!): Int
    updateCourse(id: Int!, course: CourseInput!): Course!
`;
