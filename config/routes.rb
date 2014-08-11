Rails.application.routes.draw do
  resources :room
  root 'room#index'
  
  end
