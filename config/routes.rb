Goldenmile::Application.routes.draw do
 
  devise_for :admins

 namespace "admin" do 
   root :to => "overview#index"
 end 
  root :to => "home#index"

end
