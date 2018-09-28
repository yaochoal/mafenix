class CreateResources < ActiveRecord::Migration[5.2]
  def change
    create_table :resources do |t|
      t.string :name
      t.string :link
      t.string :description
      t.string :resource

      t.timestamps
    end
  end
end
