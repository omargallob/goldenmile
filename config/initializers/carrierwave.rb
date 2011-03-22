require 'carrierwave/orm/mongoid'

CarrierWave.configure do |config|
  config.permissions = 0666
  config.storage = :s3
  config.root = Rails.root.join('tmp')
  config.cache_dir = 'carrierwave'

  config.s3_access_key_id = "AKIAI7DG2I3UGHEC6FKA"
  config.s3_secret_access_key = "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"
  config.s3_bucket = "goldenmile"
  #config.s3_region =""
end
