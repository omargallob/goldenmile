class Page
  include Mongoid::Document
  field :name, :type => String
  field :navlabel, :type => String
  field :title, :type => String
  field :category, :type => String
  field :body, :type => String
end
