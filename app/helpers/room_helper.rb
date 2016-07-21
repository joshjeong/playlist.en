require 'google/api_client'

module RoomHelper

  YOUTUBE_API_SERVICE_NAME = 'youtube'
  YOUTUBE_API_VERSION = 'v3'

  def set_client
    @client = Google::APIClient.new(
      :key => ENV["DEVELOPER_KEY"],
      :authorization => nil,
      :application_name => 'playlisten',
      :application_version => '1.0.0'
    )

    @youtube = @client.discovered_api(YOUTUBE_API_SERVICE_NAME, YOUTUBE_API_VERSION)
  end

  def get_videos(search)
    begin
      search_response = @client.execute!(
        :api_method => @youtube.search.list,
        :parameters => {
          :part => 'snippet',
          :q => search,
          :maxResults => 25
        }
      )

      videos = []
      channels = []
      playlists = []

      # Add each result to the appropriate list, and then display the lists of
      # matching videos, channels, and playlists.
      search_response.data.items.each do |search_result|
        case search_result.id.kind
          when 'youtube#video'
            videos << search_result
          when 'youtube#channel'
            channels << search_result
          when 'youtube#playlist'
            playlists << search_result
        end
      end

    rescue Google::APIClient::TransmissionError => e
      puts e.result.body
    end
    videos
  end

  def get_title(videoId)
    set_client
    search_response = @client.execute!(
      :api_method => @youtube.videos.list,
      :parameters => {
        :part => 'snippet,contentDetails',
        :id => videoId
      }
    )  
    
    puts search_response.data.items[0]["snippet"]["title"]
    search_response.data.items[0]["snippet"]["title"]
  end

end
