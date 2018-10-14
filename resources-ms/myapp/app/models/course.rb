# == Schema Information
#
# Table name: courses
#
#  id          :integer          not null, primary key
#  name        :string
#  description :string
#  code        :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Course < ApplicationRecord
    #asociacion de profesores a materias
    has_many :teacher_has_courses
    has_many :teachers, through: :teacher_has_courses
    #asociacion de recursos a materias
    has_many :course_has_resources
    has_many :resources, through: :courses_has_resources
    scope :search, ->(params){where("name iLIKE ?",params)}
end
