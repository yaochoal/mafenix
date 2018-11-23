export const teachersTypeDef = `
type Teacher {
    id: Int!
    name: String!
    description: String!
    teacher_has_courses: [Teacher_has_courses]
    teacher_has_resources: [Teacher_has_resources]
}

type Teacher_has_resources{
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
}
input TeacherSearch {
    teacher_name: String!
}`;

export const teachersQueries = `
    allTeachers(page: Int!): [Teacher]!
    allTeachers1: [Teacher]!
    teacherById(id: Int!): Teacher!
    teacherByName(teacher: TeacherSearch!): [Teacher]!
`;

export const teachersMutations = `
    createTeacher(teacher: TeacherInput!): Teacher!
    deleteTeacher(id: Int!): Int
    updateTeacher(id: Int!, teacher: TeacherInput!): Teacher!
`;
