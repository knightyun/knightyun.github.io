# 这个文件用于管理 Jekyll 运行时需要安装的依赖；
# 当你想使用某个依赖的另外一个版本时，那么就在下面的配置进行修改；
# 然后保存该文件，再运行 bundle install 就可以更新相应版本了；
# 启动 Jekyll 本地服务请使用下面的命令：
#
#     bundle exec jekyll serve
#
# 下面的配置用于更改 Jekyll 的默认版本：
# gem "jekyll", "~> 3.8.5"

# 这是 Jekyll 网站的默认主题，你可以换成自己喜欢的其它主题：
# gem "minima", "~> 2.0"

# 另外，如果你使用 GitHub Pages 功能搭建网站的话，
# 那么请将上面的代码注释掉，换成使用下面的代码：

gem "github-pages", group: :jekyll_plugins

# 需要更新相关依赖版本，请运行命令：bundle update github-pages

# 如果需要使用插件的话，请改变下面的配置：
#
group :jekyll_plugins do
#   gem "jekyll-feed", "~> 0.6"
    gem "jekyll-admin"
end

# Windows 不支持空文件，需要使用下面的包：
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

# 默认是官方的 ruby 源，可以选择中国的源进行加速：
# source 'https://gems.ruby-china.com'
source 'https://rubygems.org'

# Windows 平台中如果频繁改变文件内容，使用下面的包可以提升性能：
gem 'wdm', '>=0.1.0' if Gem.win_platform?

# Fix ruby 3.0 webrick bug
gem "webrick"