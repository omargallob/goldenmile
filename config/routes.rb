Goldenmile::Application.routes.draw do
 


  #get "properties/index"
  match "properties/search" => "properties#search"
  resources :properties

  devise_for :admins

 namespace "admin" do 
   scope 'properties' do     
     resources :types do 
       resources :subtypes
     end
   end
   root :to => "overview#index"
 end 
  root :to => "home#index"

end
