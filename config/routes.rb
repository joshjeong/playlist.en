Rails.application.routes.draw do
  resources :rooms do
    member do
      post 'search'
      post 'theatre'
      post 'nextvideo'
      get 'guest'
      post 'guestsearch'
      get 'playlist'
    end
    resources :tracks
  end
  root 'rooms#index'
    
end
