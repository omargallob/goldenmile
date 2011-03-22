class Section
  include Mongoid::Document
  field :name
  #embeds_many :pages
  references_many :pages,:dependent => :destroy, :inverse_of => :section
  index "pages.category"
end
