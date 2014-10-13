Rails.application.routes.draw do
  resources :rooms do
    member do
      post 'search'
      post 'theatre'
    end
    resources :tracks
  end
  root 'rooms#index'
    
end
