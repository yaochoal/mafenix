Rails.application.routes.draw do
  resources :resources
  resources :teachers
  resources :courses
  resources :search
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
