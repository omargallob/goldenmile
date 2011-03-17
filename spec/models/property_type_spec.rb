require File.dirname(__FILE__) + '/../spec_helper'

describe PropertyType do
  it "should be valid" do
    PropertyType.new.should be_valid
  end
end
