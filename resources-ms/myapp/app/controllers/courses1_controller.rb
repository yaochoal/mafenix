class Courses1Controller < ApplicationController
  # GET /courses
  #http://localhost:3000/courses?page=1
  def index
    @courses = Course.all
    render json: @courses
  end


end
