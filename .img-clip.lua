local year = os.date("%Y")

return {
  -- priority #5
  default = {
    -- VitePress Specific: Centralized storage in public folder
    dir_path = "docs/public/img/" .. year,
    extension = "avif",

    -- Compression: Matches global config (avif @ 75%)
    process_cmd = "convert - -quality 75 avif:-",

    -- Path calculations
    -- VitePress Specific: relative_template_path must be true for build/preview compatibility
    use_absolute_path = false,
    relative_to_current_file = false,
    relative_template_path = true,
  },

  -- priority #4
  filetypes = {
    markdown = {
      -- Matches global config template
      template = "![$FILE_NAME]($FILE_PATH)",
    },
  },
}
