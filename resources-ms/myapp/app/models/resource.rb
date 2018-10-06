# == Schema Information
#
# Table name: resources
#
#  id          :integer          not null, primary key
#  name        :string
#  link        :string
#  description :string
#  resource    :string
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class Resource < ApplicationRecord
    has_one_attached :file
    #asociacion de profesores a recurso
    has_many :teacher_has_resources
    has_many :teachers, through: :teacher_has_resources
    #asociacion de recursos a materias
    has_many :course_has_resources
    has_many :courses, through: :course_has_resources
    scope :search, ->(params){where("name LIKE ?",params)}
end
