module RoomHelper

  def get_client
    @client ||= YouTubeIt::Client.new(:dev_key => ENV["API_KEY"])
  end

end
