class SearchController < ApplicationController

  # Post /search
  def create
    if params[:teacher_name]
    	palabra = params[:teacher_name]
    	@search = Teacher.search("%#{palabra}%")
    	render json: @search
    end
    if params[:course_name]
    	palabra = params[:course_name]
    	@search = Course.search("%#{palabra}%")
    	render json: @search
    end
    if params[:resource_name]
    	palabra = params[:resource_name]
    	@search = Resource.search("%#{palabra}%")
    	render json: @search
    end
  end

end
