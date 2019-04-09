Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  get "/users/verify", to: 'users#verify'
    post "/users/login", to: 'users#login'
  resources :users do
    resources :trips
  end
end
