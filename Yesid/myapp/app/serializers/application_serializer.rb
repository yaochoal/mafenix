class ApplicationSerializer < ActiveModel::Serializer
  include Rails.application.routes.url_helpers
  default_url_options[:host] = 'http:localhost:3000'
end