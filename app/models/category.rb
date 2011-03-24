class Category
  include Mongoid::Document
  field :name
  field :price, :type => Float
  field :season
  embedded_in :property,:inverse_of => :categories
  
end
