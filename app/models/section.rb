class Section
  include Mongoid::Document
  field :name
  #embeds_many :pages
  references_many :pages,:dependent => :destroy
  index "pages.category"
end
