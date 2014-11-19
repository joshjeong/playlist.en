module RoomHelper

  def get_client
    @client ||= YouTubeIt::Client.new(:dev_key => ENV["API_KEY"])
  end

  def get_videos(search)
    @client.videos_by(:query => search, :page => 1, :per_page => 10)
  end

  def get_title(video)
    @client.video_by(video).title
  end

end
