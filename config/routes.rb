Goldenmile::Application.routes.draw do
 






  #get "properties/index"
  match "properties/search" => "properties#search"

  resources :properties
  devise_for :admins

 namespace "admin" do 
   
   resources :pages
   resources :sections
   # resources :sections
   # resources :pages
   # scope 'properties' do     
   #    resources :property_types 
   #   # resources :types do 
   #   #        resources :subtypes
   #   #      end
   # end
   root :to => "overview#index"
 end 
  root :to => "home#index"

end
