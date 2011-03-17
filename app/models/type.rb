class Type
  include Mongoid::Document
  field :name
  embeds_many :subtypes, :inverse_of => :type
end
