class PropertyType < ActiveRecord::Base

  attr_accessible :name, :title, :parent_id

  has_many :subtypes, :class_name => 'PropertyType', :foreign_key => 'parent_id'
  belongs_to :parent, :class_name => 'PropertyType', :foreign_key => 'parent_id'
  
  def self.find_main
      PropertyType.where("parent_id IS ?", nil).all
  end
end
