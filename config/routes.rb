Rails.application.routes.draw do
  devise_for :users

  namespace :api do
    namespace :v1 do
      get 'recipes/index'
      post 'recipes/create'
      get '/show/:id', to: 'recipes#show'
      delete '/destroy/:id', to: 'recipes#destroy'
      put '/update/:id', to: 'recipes#update'
    end
  end

  namespace :api do
    namespace :v1 do
      get '/user_info', to: 'devise_info#user_info'
    end
  end

  root "home#index"
end
