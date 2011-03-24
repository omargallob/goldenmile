class Property
  include Mongoid::Document
  #field :category, :type => String
  field :subtype, :type => String
  field :bath, :type => Integer
  field :beds, :type => Integer
  field :year, :type => Time
  field :built, :type => Integer
  field :constructed, :type => Integer
  field :terrace, :type => Integer
  field :garden, :type => Integer
  field :furniture, :type => String
  field :home_appliances, :type => String
  field :other_rooms, :type => String
  field :security, :type => String
  field :store_room, :type => String
  field :condition, :type => String
  field :swimming_pool, :type => String
  field :views, :type => String
  field :orientation, :type => String
  field :kitchen, :type => String
  field :parking, :type => String
  field :description, :type => String
 
  embeds_many :categories 
  accepts_nested_attributes_for :categories, :allow_destroy => true 
  
end
