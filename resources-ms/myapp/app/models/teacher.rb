# == Schema Information
#
# Table name: teachers
#
#  id          :integer          not null, primary key
#  name        :string
#  description :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Teacher < ApplicationRecord
    #asosiacion de profesores a materias
    has_many :teacher_has_courses
    has_many :courses, through: :teacher_has_courses
    #asosiacion de profesores a recurso
    has_many :teacher_has_resources
    has_many :resources, through: :teacher_has_resources
end
