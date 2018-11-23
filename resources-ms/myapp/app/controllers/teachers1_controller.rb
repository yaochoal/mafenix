class Teachers1Controller < ApplicationController

  # GET /teachers
  #http://localhost:3000/teachers?page=1
  def index
    @teachers = Teacher.all
    render json: @teachers
  end

end
