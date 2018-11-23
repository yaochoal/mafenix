class WsresourcesController < ApplicationController
    #http://192.168.99.101:4000/wsresources/wsdl
    soap_service namespace: 'urn:WashOutResources', camelize_wsdl: :lower
    soap_action "viewCourse",
                :args => { :courseId => :integer},
                :return => { :courseValid => :boolean, :courseId => :integer, :courseName => :string,
                     :courseDescription => :string, :courseCode => :integer}
    def viewCourse
        if (Course.exists?(id: params[:courseId]))
            @course = Course.find(params[:courseId])
            id = @course.id
            name = @course.name
            description = @course.description
            code = @course.code
            render :soap => { :courseValid => true, :courseId => id, :courseName => name,
                :courseDescription => description, :courseCode => code}
        else
            render :soap => { :courseValid => false, :courseId => 0, :courseName => "",
                :courseDescription => "", :courseCode => 0}
        end
    end
    soap_action "viewTeacher",
                :args => { :teacherId => :integer},
                :return => { :teacherValid => :boolean, :teacherId => :integer, :teacherName => :string,
                     :teacherDescription => :string}
    def viewTeacher
        if (Teacher.exists?(id: params[:teacherId]))
            @teacher = Teacher.find(params[:teacherId])
            id = @teacher.id
            name = @teacher.name
            description = @teacher.description
            render :soap => { :teacherValid => true, :teacherId => id, :teacherName => name,
                :teacherDescription => description}
        else
            render :soap => { :teacherValid => false, :teacherId => 0, :teacherName => "",
                :teacherDescription => ""}
        end
    end
    soap_action "viewResource",
                :args => { :resourceId => :integer},
                :return => { :resourceValid => :boolean, :resourceId => :integer, :resourceName => :string,
                     :resourceDescription => :string,:resourceLink => :string}
    def viewResource
        if (Resource.exists?(id: params[:resourceId]))
            @resource = Resource.find(params[:resourceId])
            id = @resource.id
            name = @resource.name
            description = @resource.description
            link = @resource.link
            render :soap => { :resourceValid => true, :resourceId => id, :resourceName => name,
                :resourceDescription => description, :resourceLink => link}
        else
            render :soap => { :resourceValid => false, :resourceId => 0, :resourceName => "",
                :resourceDescription => "", :resourceLink => ""}
        end
    end

end
