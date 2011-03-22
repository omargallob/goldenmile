class Subpage < Page
  include Mongoid::Document
  include Mongoid::Tree
  referenced_in :page, :inverse_of => :subpages
end
