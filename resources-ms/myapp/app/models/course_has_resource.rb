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

class CourseHasResource < ApplicationRecord
  belongs_to :course, required: false
  belongs_to :resource, required: false
end
