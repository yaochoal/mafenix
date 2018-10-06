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

class CourseSerializer < ActiveModel::Serializer
  attributes :id , :name ,:description,:code

  has_many :teacher_has_courses
  has_many :course_has_resources

end
