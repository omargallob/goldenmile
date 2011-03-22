class Upload
  include Mongoid::Document
  field :title 
  field :description 
  field :photo
  embedded_in :gallery, :inverse_of => :uploads
  mount_uploader :photo, PhotoUploader
  
end
