class Song < ActiveRecord::Base
  # Remember to create a migration!
  belongs_to :room
end