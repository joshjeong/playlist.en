class CreateRooms < ActiveRecord::Migration
  def change
    create_table :rooms do |t|
      t.string :name, :playlist
      t.boolean :host
      t.integer :track_num
      t.timestamps
    end
  end
end
