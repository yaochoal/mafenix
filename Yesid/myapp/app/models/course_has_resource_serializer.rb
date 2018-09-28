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
  attributes :id, :resource_id,:resource_name,:course_name,:resource_name,:course_id
  def course_name
  	Course.find(object.course_id).name
  end
  def resource_name
  	Resource.find(object.resource_id).name
  end

end
