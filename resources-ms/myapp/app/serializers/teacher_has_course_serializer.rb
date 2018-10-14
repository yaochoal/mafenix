# == Schema Information
#
# Table name: teacher_has_courses
#
#  id         :integer          not null, primary key
#  teacher_id :integer
#  course_id  :integer
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class TeacherHasCourseSerializer < ActiveModel::Serializer
  attributes :id,:teacher_id, :teacher_name,:teacher_description,:course_id,:course_name,:course_description,:course_code
  def teacher_name
  	Teacher.find(object.teacher_id).name
  end
  def teacher_description
  	Teacher.find(object.teacher_id).description
  end
  def course_name
  	Course.find(object.course_id).name
  end
  def course_description
  	Course.find(object.course_id).description
  end
  def course_code
  	Course.find(object.course_id).code
  end
 
 
  
end
