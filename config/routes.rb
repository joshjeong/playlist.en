Rails.application.routes.draw do
  resources :rooms do
    member do
      post 'search'
      post 'theatre'
      post 'nextvideo'
      get 'guest'
      post 'guestsearch'
      get 'get_playlist'
      get 'add_to_queue'
    end
    resources :tracks
  end
  root 'rooms#index'
    
end
