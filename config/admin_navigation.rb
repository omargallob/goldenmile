SimpleNavigation::Configuration.run do |navigation|
  # Specify a custom renderer if needed.
  # The default renderer is SimpleNavigation::Renderer::List which renders HTML lists.
  # The renderer can also be specified as option in the render_navigation call.
  # navigation.renderer = Your::Custom::Renderer

  # Specify the class that will be applied to active navigation items. Defaults to 'selected'
  navigation.selected_class = 'active'
  navigation.items do |primary|
    primary.dom_id = 'admin'  
    primary.item :home, t('nav.admin.overview'), admin_root_path
    primary.item :home, t('nav.admin.sections'), admin_sections_path
    #primary.item :home, t('nav.admin.pages'), admin_pages_path
    primary.item :logout, "Logout", destroy_admin_session_path
  end

end