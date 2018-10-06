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

class TeacherSerializer < ActiveModel::Serializer
  attributes :id, :name,  :description

  has_many :teacher_has_courses
  has_many :teacher_has_resources
 
end
