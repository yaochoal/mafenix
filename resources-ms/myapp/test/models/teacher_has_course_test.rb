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

require 'test_helper'

class TeacherHasCourseTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
