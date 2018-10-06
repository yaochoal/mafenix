# == Schema Information
#
# Table name: teacher_has_resources
#
#  id          :integer          not null, primary key
#  teacher_id  :integer
#  resource_id :integer
#  created_at  :datetime         not null
#  updated_at  :datetime         not null
#

require 'test_helper'

class TeacherHasResourceTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
