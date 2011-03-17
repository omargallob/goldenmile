class Subtype
  include Mongoid::Document
  field :name
  embedded_in :type, :inverse_of => :subtypes
end
