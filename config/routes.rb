Rails.application.routes.draw do
  resources :rooms do
    resources :tracks
  end
  root 'rooms#index'
    
end
