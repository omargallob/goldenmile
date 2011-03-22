Goldenmile::Application.routes.draw do
 







  #get "properties/index"
  match "properties/search" => "properties#search"

  resources :properties
  devise_for :admins

 namespace "admin" do 
   
   resources :galleries do 
     resources :uploads
    end
  # resources :pages
   resources :sections do 
     resources :pages do
       resources :galleries do 
          resources :uploads
         end
     end 
   end 
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
