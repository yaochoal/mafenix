class CreateTeacherHasResources < ActiveRecord::Migration[5.2]
  def change
    create_table :teacher_has_resources do |t|
      t.belongs_to :teacher, foreign_key: true
      t.belongs_to :resource, foreign_key: true

      t.timestamps
    end
  end
end
