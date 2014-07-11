class CreateSongs < ActiveRecord::Migration
  def change
  	create_table :songs do |t|
  	t.string :video_id
  	t.integer	:room_id
  	t.timestamps
  	end
  end
end
