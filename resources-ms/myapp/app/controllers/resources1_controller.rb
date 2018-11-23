class Resources1Controller < ApplicationController

  # GET /resources
  #http://localhost:3000/resources?page=1
  def index
    @resources = Resource.all
    render json: @resources
    end

end
