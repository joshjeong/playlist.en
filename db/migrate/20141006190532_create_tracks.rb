class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.string :video_id
      t.belongs_to :room
      t.timestamps
    end
  end
end
