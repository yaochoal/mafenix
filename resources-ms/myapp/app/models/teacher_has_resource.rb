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

class TeacherHasResource < ApplicationRecord
  belongs_to :teacher, required: false
  belongs_to :resource, required: false
end
