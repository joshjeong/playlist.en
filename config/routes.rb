Rails.application.routes.draw do
  resources :rooms do
    get 'pick', on: :collection
  end
  root 'rooms#index'

    
end
