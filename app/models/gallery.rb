class Gallery
  include Mongoid::Document
  field :title, :type => String
  field :description, :type => String
  embeds_many :uploads
  #referenced_in :page, :inverse_of => :galleries
  embedded_in :galleriable, :inverse_of => :gallery
end
