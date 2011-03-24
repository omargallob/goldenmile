class Admin::BaseController < ApplicationController		
  before_filter :authenticate_admin!
  uses_tiny_mce
end