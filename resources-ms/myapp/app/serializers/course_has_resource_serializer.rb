# == Schema Information
#
# Table name: course_has_resources
#
#  id          :integer          not null, primary key
#  course_id   :integer
#  resource_id :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

class CourseHasResourceSerializer < ActiveModel::Serializer
  attributes :id, :resource_id,:resource_name,:resource_description,:resource_link,:course_id,:course_name,:course_description,:course_code
  def course_name
  	Course.find(object.course_id).name
  end
  def course_description
  	Course.find(object.course_id).description
  end
  def course_code
  	Course.find(object.course_id).code
  end
  def resource_name
  	Resource.find(object.resource_id).name
  end
  def resource_description
  	Resource.find(object.resource_id).description
  end
  def resource_link
  	Resource.find(object.resource_id).link
  end
end
