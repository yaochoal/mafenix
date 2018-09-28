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

class ResourceSerializer < ActiveModel::Serializer
  attributes :id ,:name ,:link ,:created_at, :description, :resource
  has_many :course_has_resources
  has_many :teacher_has_resources


end
