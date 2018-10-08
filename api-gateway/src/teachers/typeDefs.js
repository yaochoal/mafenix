export const teachersTypeDef = `
type Teacher {
    id: Int!
    name: String!
    description: String!
    teacher_has_courses: [Courses]
    teacher_has_resources: [Resources]
}
type Courses{
    id: Int!
    teacher_id: Int!
    teacher_name: String!
    teacher_description: String!
    course_id: Int!
    course_name: String!
    course_description: String!
    course_code: Int!
}
type Resources{
    id: Int!
    teacher_id: Int!
    teacher_name: String!
    teacher_description: String!
    resource_id: Int!
    resource_name: String!
    resource_description: String!
    resource_link: String!
}
input TeacherInput {
    name: String!
    description: String!
}`;

export const teachersQueries = `
    allTeachers(page: Int!): [Teacher]!
    teacherById(id: Int!): Teacher!
`;

export const teachersMutations = `
    createTeacher(teacher: TeacherInput!): Teacher!
    deleteTeacher(id: Int!): Int
    updateTeacher(id: Int!, teacher: TeacherInput!): Teacher!
`;
