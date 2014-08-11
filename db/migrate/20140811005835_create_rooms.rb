class CreateRooms < ActiveRecord::Migration
  def change
    create_table :rooms do |t|
      t.string :name, :playlist

      t.timestamps
    end
  end
end
