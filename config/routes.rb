Rails.application.routes.draw do
  resources :rooms do
    collection do
      post 'search'
    end
    resources :tracks
  end
  root 'rooms#index'
    
end
