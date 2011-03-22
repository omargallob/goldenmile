class Page
  include Mongoid::Document

  
  field :name 
  field :navlabel 
  field :title 
  field :category 
  field :body
  referenced_in :section, :inverse_of => :pages
  embeds_many :galleries
  references_many :subpages
  validates_presence_of :name, :title, :navlabel, :category, :body
  validates_uniqueness_of :name
end
